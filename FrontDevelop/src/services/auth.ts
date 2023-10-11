interface ChargerData {
    charger_type: {
        image: File | null;
        name: string;
        brand: string;
        power: string;
        port_type: string;
        amp: string;
        warranty: number;
    };
    address: {
        street_address: string;
        lat: string;
        lng: string;
        suburb: string;
        post_code: string;
        country: string;
    };
    name: string;
    number_of_stars: number;
    number_of_rating: string;
    renter: number;
}


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

export const createCharger = async (chargerData: any) => {
    console.log(chargerData);

    try {
        const response = await fetch('http://localhost:8000/charger/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chargerData),  // Convert chargerData to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessages = Object.values(errorData).flat().join(', ');  // Extract error messages from errorData object
            throw new Error(errorMessages || 'Failed to create charger.');
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};










