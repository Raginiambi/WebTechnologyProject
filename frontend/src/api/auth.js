const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : 'http://localhost:5000';
const API_URL = `${base}/api/auth`;

export const signup = async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

// export const login = async (userData) => {
//     const response = await fetch(`${API_URL}/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong');
//     }

//     if (data.token) {
//         localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;
// };

export const login = async (formData) => {

  let baseUrl =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000';

  baseUrl = baseUrl.replace(/\/+$/, '');

  const response = await fetch(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  console.log('LOGIN RESPONSE:', data);

  if (!response.ok) {

    throw new Error(
      data.message || 'Login failed'
    );
  }
  

  /* ================= STORE USER ================= */

//   const userData = {

//     _id:
//       data._id ||
//       data.user?._id,

//     name:
//       data.name ||
//       data.user?.name,

//     email:
//       data.email ||
//       data.user?.email,

//     token:
//       data.token || data.access_token,

//     role:
//       data.role ||
//       data.user?.role ||
//       'user',
//   };

const userData = {
  ...data,
  token: data.access_token,
};


  localStorage.setItem(
    'user',
    JSON.stringify(userData)
  );

  return userData;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
