import { getStaticDatabaseData } from "../../lib/database";
import DatabaseDemo from "../ui/database-demo/DatabaseDemo";

export default async function DatabasePage() {
  // Fetch initial data at build time
  const data = await getStaticDatabaseData("todos");

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🗃️ Free Database Integration</h1>

      <div
        style={{
          backgroundColor: "#e8f5e8",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "2px solid #4caf50",
        }}
      >
        <h2>🎉 Full CRUD Database Operations</h2>
        <p>
          This demonstrates a <strong>complete database integration</strong>{" "}
          with your GitHub Pages site. You can{" "}
          <strong>Create, Read, Update, and Delete</strong> records using any of
          these free services:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <strong>🟢 Supabase</strong>
            <br />
            <small>PostgreSQL • 500MB Free</small>
          </div>
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <strong>🔥 Firebase</strong>
            <br />
            <small>NoSQL • 1GB Free</small>
          </div>
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <strong>🌍 PlanetScale</strong>
            <br />
            <small>MySQL • 1B reads/month</small>
          </div>
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <strong>📊 Airtable</strong>
            <br />
            <small>Hybrid • 1,200 records</small>
          </div>
        </div>
      </div>

      {data.error ? (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #ffeaa7",
          }}
        >
          <h3>⚠️ Database Not Configured</h3>
          <p>
            <strong>Error:</strong> {data.error}
          </p>
          <p>To get started:</p>
          <ol>
            <li>Choose a database service (Supabase recommended)</li>
            <li>
              Update your <code>.env.local</code> file with credentials
            </li>
            <li>
              Create a <code>todos</code> table in your database
            </li>
            <li>Refresh this page</li>
          </ol>
          <p>
            <strong>📚 Need help?</strong> Check the{" "}
            <code>DATABASE_SETUP.md</code> file for detailed instructions.
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #c3e6cb",
            }}
          >
            ✅ Database connected successfully! Using{" "}
            <strong>{data.method}</strong>
          </div>

          <DatabaseDemo
            initialData={data.data}
            provider={process.env.NEXT_PUBLIC_DB_PROVIDER as any}
            tableName="todos"
          />
        </div>
      )}

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3>🛠️ What You Can Do:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #dee2e6",
            }}
          >
            <h4>➕ Create Records</h4>
            <p>
              Add new data to your database with the form above. Perfect for
              contact forms, todo lists, blog posts, etc.
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #dee2e6",
            }}
          >
            <h4>📖 Read Data</h4>
            <p>
              Display your database content on any page. Great for dynamic
              content, user-generated content, etc.
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #dee2e6",
            }}
          >
            <h4>✏️ Update Records</h4>
            <p>
              Edit existing data inline. Users can modify their submissions,
              update profiles, change settings.
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #dee2e6",
            }}
          >
            <h4>🗑️ Delete Records</h4>
            <p>
              Remove unwanted data safely. Include confirmation dialogs to
              prevent accidental deletions.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h3>🚀 Deploy to GitHub Pages</h3>
        <p>This works perfectly with GitHub Pages static hosting:</p>
        <ul>
          <li>✅ Initial data loads at build time (super fast)</li>
          <li>✅ Real-time updates work on the client</li>
          <li>✅ No server required - just push to GitHub</li>
          <li>✅ Scales automatically with your database service</li>
        </ul>
      </div>
    </div>
  );
}
