export const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/user/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
        return { status: 200, data: await response.json() };
    } else {
        const errorData = await response.json();
        return { status: response.status, ...errorData };
    }
};

export const register = async (user: any) => {
    try {
        const response = await fetch('http://localhost:8000/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to register.');
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

