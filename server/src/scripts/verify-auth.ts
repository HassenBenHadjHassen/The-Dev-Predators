import axios from "axios";

const API_URL = "http://localhost:5001/api";

const generateRandomUser = () => {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    fullName: `Test User ${randomId}`,
    email: `testuser${randomId}@example.com`,
    password: "Password123!",
  };
};

const runTest = async () => {
  try {
    const newUser = generateRandomUser();
    console.log("🔹 Testing Registration with:", newUser.email);

    // 1. Register
    const registerRes = await axios.post(`${API_URL}/auth/register`, newUser);
    console.log("✅ Registration successful:", registerRes.data);

    // 2. Login
    console.log("\n🔹 Testing Login...");
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: newUser.email,
      password: newUser.password,
    });
    console.log("✅ Login successful");
    const token = loginRes.data.data.token;
    console.log("🔑 Received Token:", token.substring(0, 20) + "...");

    // 3. Get Profile
    console.log("\n🔹 Testing Get Profile (Protected Route)...");
    const profileRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Profile retrieved:", profileRes.data.data);

    console.log("\n🎉 All tests passed!");
  } catch (error: any) {
    console.error(
      "❌ Test failed:",
      error.response ? error.response.data : error.message
    );
  }
};

runTest();
