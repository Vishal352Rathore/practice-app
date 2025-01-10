import React, { useState } from 'react';

const SimpleForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({...prevData,[name]: value,  }));
    };

    return (
        <div style={{ padding: '20px' }}>
            <form>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
            </form>
            <h3>Real-Time Input Values:</h3>
            <p>
                <strong>Username:</strong> {formData.username}
            </p>
            <p>
                <strong>Email:</strong> {formData.email}
            </p>
        </div>
    );
};

export default SimpleForm;
