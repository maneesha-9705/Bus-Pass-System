const BASE_URL = 'http://localhost:5000';
const email = 'test_otp@example.com';

async function test_otp_flow() {
    console.log('--- Starting OTP System Verification ---');

    try {
        // 1. Initial Send
        console.log('\n[1] Initial Send OTP...');
        let res = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        let data = await res.json();
        console.log('Response:', data.message, '| Attempts:', data.resendAttempts);

        // 2. Immediate Resend (Cooldown check)
        console.log('\n[2] Immediate Resend (should fail 429)...');
        res = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        data = await res.json();
        console.log('Status:', res.status, '| Message:', data.message);

        // 3. Wait 31s
        console.log('\n[3] Waiting 31 seconds for cooldown...');
        await new Promise(resolve => setTimeout(resolve, 31000));

        // 4. Second Send
        console.log('\n[4] Second Send OTP...');
        res = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        data = await res.json();
        console.log('Response:', data.message, '| Attempts:', data.resendAttempts);

        // 5. Wait 31s
        console.log('\n[5] Waiting 31 seconds for cooldown...');
        await new Promise(resolve => setTimeout(resolve, 31000));

        // 6. Third Send
        console.log('\n[6] Third Send OTP...');
        res = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        data = await res.json();
        console.log('Response:', data.message, '| Attempts:', data.resendAttempts);

        // 7. Wait 31s
        console.log('\n[7] Waiting 31 seconds for cooldown...');
        await new Promise(resolve => setTimeout(resolve, 31000));

        // 8. Fourth Send (Max attempts)
        console.log('\n[8] Fourth Send OTP (should fail 403 Max Attempts)...');
        res = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        data = await res.json();
        console.log('Status:', res.status, '| Message:', data.message);

        console.log('\n--- OTP System Verification Complete ---');
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

test_otp_flow();
