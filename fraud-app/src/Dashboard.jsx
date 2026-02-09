import { useState } from "react";
import { api } from "./api";

export default function Dashboard() {
    const [form, setForm] = useState({
        amt: 100,
        trans_hour: 12,
        trans_weekday: 1,
        is_weekend: 0,
        is_night: 0,
        age: 30,
        gender: 1,
        city_pop: 500000,
        cust_merch_distance_km: 5,
        far_distance_flag: 0,
        merchant_te: 0.5,
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // ✅ ADD MISSING BACKEND FIELDS HERE
            const payload = {
                ...form,

                city_freq: 1500,
                state_freq: 4500,
                job_freq: 800,

                lat: 12.9716,
                long: 77.5946,
                merch_lat: 12.9718,
                merch_long: 77.5949,
            };

            const res = await api.post("/predict", payload);
            setResult(res.data);
        } catch (err) {
            alert("Backend not reachable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Loader */}
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}

            {/* Result Modal */}
            {result && (
                <div className="modal-overlay">
                    <div
                        className={`modal ${
                            result.prediction === "FRAUD" ? "danger" : "success"
                        }`}
                    >
                        <h3>Prediction Result</h3>
                        <p><b>Status:</b> {result.prediction}</p>
                        <p><b>Probability:</b> {result.fraud_probability}</p>
                        <p><b>Threshold:</b> {result.threshold_used}</p>
                        <button onClick={() => setResult(null)}>Close</button>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="container">
                <h2>Fraud Detection</h2>

                <label>Transaction Amount</label>
                <input
                    type="number"
                    value={form.amt}
                    onChange={(e) => setForm({ ...form, amt: +e.target.value })}
                />

                <label>Transaction Hour</label>
                <input
                    type="number"
                    value={form.trans_hour}
                    onChange={(e) =>
                        setForm({ ...form, trans_hour: +e.target.value })
                    }
                />

                <label>Transaction Day</label>
                <select
                    value={form.trans_weekday}
                    onChange={(e) =>
                        setForm({ ...form, trans_weekday: +e.target.value })
                    }
                >
                    <option value={0}>Monday</option>
                    <option value={1}>Tuesday</option>
                    <option value={2}>Wednesday</option>
                    <option value={3}>Thursday</option>
                    <option value={4}>Friday</option>
                    <option value={5}>Saturday</option>
                    <option value={6}>Sunday</option>
                </select>

                <label>Is Weekend?</label>
                <select
                    value={form.is_weekend}
                    onChange={(e) =>
                        setForm({ ...form, is_weekend: +e.target.value })
                    }
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>

                <label>Is Night Transaction?</label>
                <select
                    value={form.is_night}
                    onChange={(e) =>
                        setForm({ ...form, is_night: +e.target.value })
                    }
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>

                <label>Gender</label>
                <select
                    value={form.gender}
                    onChange={(e) =>
                        setForm({ ...form, gender: +e.target.value })
                    }
                >
                    <option value={1}>Male</option>
                    <option value={0}>Female</option>
                </select>

                <label>Customer Age</label>
                <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: +e.target.value })}
                />

                <label>City Population</label>
                <input
                    type="number"
                    value={form.city_pop}
                    onChange={(e) =>
                        setForm({ ...form, city_pop: +e.target.value })
                    }
                />

                <label>Customer–Merchant Distance (km)</label>
                <input
                    type="number"
                    value={form.cust_merch_distance_km}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            cust_merch_distance_km: +e.target.value,
                        })
                    }
                />

                <label>Far Distance Transaction?</label>
                <select
                    value={form.far_distance_flag}
                    onChange={(e) =>
                        setForm({ ...form, far_distance_flag: +e.target.value })
                    }
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>

                <label>Merchant Risk (Target Encoding)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={form.merchant_te}
                    onChange={(e) =>
                        setForm({ ...form, merchant_te: +e.target.value })
                    }
                />

                <button onClick={handleSubmit}>Check Fraud</button>
            </div>
        </>
    );
}
