<h1>JJ_rETAP - Ride ETA Predictor</h1>

<p><strong>rETAP</strong> is a web application that predicts the Estimated Time of Arrival (ETA) for daily rides from home to a fixed office location, using simulated commute data, weekday/time-based variations, and traffic-aware route durations (excluding Google APIs).</p>

<h2>Folder Structure</h2>

<pre>
ride-eta-predictor/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   │       ├── ETAForm.js           <!-- Form to enter user ID, time, day -->
│   │       ├── MapView.js           <!-- Map displaying route -->
│   │       ├── CompareETAs.js       <!-- Compare current prediction with others -->
│   │       ├── HistoryTable.js      <!-- Table of past predictions -->
│   │       ├── RouteSummary.js      <!-- Total distance, estimated time -->
│   │       └── AnalyticsChart.js    <!-- Bar/line chart for patterns -->
│   └── public/
│       └── index.html
│   └── package.json
│
├── backend/
│   ├── app.py                 <!-- Flask/FastAPI app with /predict route -->
│   ├── model.pkl              <!-- Trained regression model -->
│   ├── utils.py               <!-- Data transformation & helper functions -->
│   ├── traffic_api.py         <!-- API integration for non-Google traffic data -->
│   └── requirements.txt
│
├── data/
│   └── trips.csv              <!-- Simulated trip data for 50 users over 3 months -->
├── notebooks/
│   └── model_training.ipynb   <!-- ML model training and evaluation -->
└── README.md
</pre>

<h2>Project Highlights</h2>
<ul>
  <li>Simulates 4500+ realistic trip records for 50 unique customers.</li>
  <li>Predicts ETA based on home coordinates, day of week, time of day, and traffic multipliers.</li>
  <li>Integrates non-Google API for route distance and baseline time (e.g., OSRM, Mapbox).</li>
  <li>Trained regression model achieves &gt;95% accuracy under controlled assumptions.</li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React (JSX, components, fetch)</li>
  <li><strong>Backend:</strong> Python (Flask or FastAPI), REST API</li>
  <li><strong>ML:</strong> Scikit-learn for regression modeling</li>
  <li><strong>Traffic API:</strong> OSRM, Mapbox, or HERE (non-Google)</li>
</ul>

<h2>Features</h2>
<ul>
  <li><strong>ETAForm:</strong> Input form to select user, time, and day</li>
  <li><strong>MapView:</strong> View route between home and office</li>
  <li><strong>CompareETAs:</strong> Compare current ETA with others</li>
  <li><strong>HistoryTable:</strong> Track historical predictions</li>
  <li><strong>AnalyticsChart:</strong> Graphs for weekly ETA trends</li>
</ul>

<h2>Assumptions</h2>
<ul>
  <li>Each customer has one fixed home and shares the same office location</li>
  <li>Trips happen once daily in both directions for ~90 days</li>
  <li>Traffic effects follow logical patterns based on time/day (rush hour multipliers)</li>
  <li>No use of Google Maps API; other traffic APIs or assumptions are used</li>
</ul>

<h2>How to Run</h2>
<ol>
  <li>Install backend dependencies: <code>pip install -r backend/requirements.txt</code></li>
  <li>Train the model via <code>notebooks/model_training.ipynb</code> and export <code>model.pkl</code></li>
  <li>Run the backend: <code>python backend/app.py</code></li>
  <li>Install frontend dependencies: <code>cd frontend &amp;&amp; npm install</code></li>
  <li>Start the frontend app: <code>npm start</code></li>
</ol>

<h2>Team</h2>
<ul>
 <li><b>JUPITER JUPYTER</li>
</ul>

<h2>Goal</h2>
<p>Build a working web application that predicts ride durations with &gt;95% accuracy using simulated but realistic commute data, and visualize user-specific travel patterns.</p>
