const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getDashboardStats = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const res = await fetch(`${BASE_URL}/api/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res.json();
};

export const getUsers = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const res = await fetch(`${BASE_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res.json();
};

export const getUserById = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const res = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res.json();
};

export const getAnalytics = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const res = await fetch(`${BASE_URL}/api/admin/analytics`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res.json();
};