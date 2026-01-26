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
    city_freq: 10,
    state_freq: 20,
    job_freq: 15,
    lat: 0,
    long: 0,
    merch_lat: 0,
    merch_long: 0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/predict", form);
      setResult(res.data);
    } catch {
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
          onChange={(e) => setForm({ ...form, amt: Number(e.target.value) })}
        />

        <label>Transaction Hour (0–23)</label>
        <input
          type="number"
          value={form.trans_hour}
          onChange={(e) =>
            setForm({ ...form, trans_hour: Number(e.target.value) })
          }
        />

        <label>Transaction Day</label>
        <select
          value={form.trans_weekday}
          onChange={(e) =>
            setForm({ ...form, trans_weekday: Number(e.target.value) })
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
            setForm({ ...form, is_weekend: Number(e.target.value) })
          }
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>

        <label>Is Night Transaction?</label>
        <select
          value={form.is_night}
          onChange={(e) =>
            setForm({ ...form, is_night: Number(e.target.value) })
          }
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>

        <label>Gender</label>
        <select
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: Number(e.target.value) })
          }
        >
          <option value={1}>Male</option>
          <option value={0}>Female</option>
        </select>

        <label>Customer Age</label>
        <input
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
        />

        <label>Customer–Merchant Distance (km)</label>
        <input
          type="number"
          value={form.cust_merch_distance_km}
          onChange={(e) =>
            setForm({
              ...form,
              cust_merch_distance_km: Number(e.target.value),
            })
          }
        />

        <label>Far Distance Transaction?</label>
        <select
          value={form.far_distance_flag}
          onChange={(e) =>
            setForm({ ...form, far_distance_flag: Number(e.target.value) })
          }
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>

        <button onClick={handleSubmit}>Check Fraud</button>
      </div>
    </>
  );
}
