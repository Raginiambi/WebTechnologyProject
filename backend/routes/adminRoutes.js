import express from 'express';

import User from '../models/User.js';
import TestResult from '../models/TestResult.js';

const router = express.Router();

/* ================= DASHBOARD ================= */

router.get('/dashboard', async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const attempts =
      await TestResult.countDocuments();

    const uniqueTests =
      await TestResult.distinct('testId');

    const results =
      await TestResult.find();

    let highRisk = 0;

    results.forEach((r) => {

      const pct =
        (r.finalScore / r.maxScore) * 100;

      if (pct < 40) highRisk++;
    });

    res.json({
      totalUsers,
      totalTests: uniqueTests.length,
      attempts,
      highRisk,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= USERS ================= */

router.get('/users', async (req, res) => {

  try {

    const users = await User.find();

    const data = await Promise.all(

      users.map(async (u) => {

        const results =
          await TestResult.find({
            userId: u._id,
          });

        const attempts =
          results.length;

        let avgScore = 0;

        if (attempts > 0) {

          avgScore = Math.round(

            results.reduce(
              (acc, curr) =>
                acc +
                (curr.finalScore /
                  curr.maxScore) *
                  100,
              0
            ) / attempts
          );
        }

        let risk = 'Low';

        if (avgScore < 40) {
          risk = 'High';
        } else if (avgScore < 70) {
          risk = 'Medium';
        }

        return {
          _id: u._id,
          name: u.name,
          email: u.email,
          attempts,
          avgScore,
          risk,
        };
      })
    );

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.get('/users/:id', async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: 'User not found',
      });
    }

    const results = await TestResult.find({
      userId: req.params.id,
    });

    res.json({
      user,
      results,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= RESULTS ================= */

router.get('/results', async (req, res) => {

  try {

    const results =
      await TestResult.find()
        .populate('userId');

    const formatted = results.map((r) => ({

      _id: r._id,

      userName:
        r.userId?.name || 'Unknown',

      email:
        r.userId?.email || '',

      testId: r.testId,

      finalScore: r.finalScore,

      maxScore: r.maxScore,

      percentage: Math.round(
        (r.finalScore / r.maxScore) * 100
      ),

      createdAt: r.createdAt,
    }));

    res.json(formatted);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= HIGH RISK ================= */

router.get('/high-risk', async (req, res) => {

  try {

    const users = await User.find();

    const risky = [];

    for (const user of users) {

      const results =
        await TestResult.find({
          userId: user._id,
        });

     let totalAttempts= results.length;

      const avg =
        results.reduce(
          (acc, curr) =>
            acc +
            (curr.finalScore /
              curr.maxScore) *
              100,
          0
        ) / results.length;

      if (avg < 40 && totalAttempts > 0) {

        risky.push({

          _id: user._id,

          name: user.name,

          email: user.email,

          avgScore: Math.round(avg),
        });
      }
    }

    res.json(risky);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= TESTS ================= */

router.get('/tests', async (req, res) => {

  try {

    const results =
      await TestResult.find();

    const grouped = {};

    results.forEach((r) => {

      if (!grouped[r.testId]) {

        grouped[r.testId] = {
          attempts: 0,
          scores: [],
        };
      }

      grouped[r.testId].attempts++;

      grouped[r.testId].scores.push(
        (r.finalScore / r.maxScore) * 100
      );
    });

    const final = Object.keys(grouped).map(
      (key) => ({

        testId: key,

        attempts:
          grouped[key].attempts,

        avgScore: Math.round(

          grouped[key].scores.reduce(
            (a, b) => a + b,
            0
          ) / grouped[key].scores.length
        ),
      })
    );

    res.json(final);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= ANALYTICS ================= */

router.get('/analytics', async (req, res) => {

  try {

    const results =
      await TestResult.find();

    const average =
      results.length > 0
        ? Math.round(
            results.reduce(
              (acc, curr) =>
                acc +
                (curr.finalScore /
                  curr.maxScore) *
                  100,
              0
            ) / results.length
          )
        : 0;

    res.json({

      totalAttempts:
        results.length,

      averageScore:
        average,

      highRisk:
        results.filter(
          (r) =>
            (r.finalScore /
              r.maxScore) *
              100 <
            40
        ).length,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/* ================= DELETE USER ================= */

router.delete('/users/:id', async (req, res) => {

  try {

    const userId = req.params.id;

    /* DELETE TEST RESULTS */

    await TestResult.deleteMany({
      userId,
    });

    /* DELETE USER */

    await User.findByIdAndDelete(
      userId
    );

    res.json({
      success: true,
      message: 'User deleted',
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error',
    });
  }
});

export default router;