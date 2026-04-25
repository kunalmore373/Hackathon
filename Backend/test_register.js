(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@gmail.com',
        profile: {
          name: 'test',
          currentDegree: 'B.Tech',
          academicStanding: { gpa: 8, university: 'testUniversity', major: 'eng' }
        },
        targetDestinations: 'UK',
        annualBudget: 100000,
        password: '123'
      })
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
