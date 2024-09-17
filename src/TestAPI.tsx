import axios from "axios";
import React, { useEffect, useState } from "react";

const TestAPI: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data");
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="test-api-title"><h1>Test API Call</h1></div>
            <div className="test-api">
                {data.map((emp: any, index: number) => (
                    <div key={index} className="test-api-card">
                        <h5>{emp.EmployeeId}</h5>
                        <h3>{emp.FirstName} {emp.LastName}</h3>
                        <p><strong>Title: </strong>{emp.Title}</p>
                        <p><strong>Reports to: </strong>{emp.ReportsTo}</p>
                        <p><strong>Birth Date: </strong>{emp.BirthDate}</p>
                        <p><strong>Hire Date: </strong>{emp.HireDate}</p>
                        <p><strong>Phone: </strong>{emp.Phone}</p>
                        <p><strong>Email: </strong>{emp.Email}</p>
                        <p><strong>Country: </strong>{emp.Country}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TestAPI;