/* SkillMitra — curated demo data. Deterministic, no external APIs. */
window.SM_DATA = (function(){
  const LEVELS = ['None','Beginner','Intermediate','Advanced'];

  const student = {
    name:'Anshuman', fullName:'Anshuman Mishra', initials:'AM',
    email:'anshuman.mishra@student.kiit.ac.in',
    college:'KIIT University, Bhubaneswar', degree:'B.Tech', branch:'Computer Science & Engineering', semester:'6',
    goal:'data-analyst',
    interests:['Data Analytics','Artificial Intelligence'],
    skills:['Python','Excel','C'],
    resume:'Anshuman_Mishra_Resume.pdf',
    joined:'July 2026',
  };

  const roles = {
    'data-analyst':{
      id:'data-analyst', title:'Data Analyst', icon:'bar-chart-3',
      summary:'Turns raw data into decisions — querying databases, analysing trends and communicating findings through dashboards.',
      demand:'High demand', entry:'₹4.5 – 8 LPA', openings:'12,400+ entry-level roles',
      required:[
        {skill:'SQL', level:3, weight:'Core', why:'Querying and joining data from relational databases is a daily task.'},
        {skill:'Python', level:3, weight:'Core', why:'Cleaning, transforming and analysing data with pandas.'},
        {skill:'Excel', level:2, weight:'Core', why:'Quick analysis, pivot tables and stakeholder-friendly reports.'},
        {skill:'Statistics', level:2, weight:'Core', why:'Hypothesis testing, distributions and reading results correctly.'},
        {skill:'Power BI', level:2, weight:'Important', why:'Building interactive dashboards for business teams.'},
      ],
      tools:['MySQL / PostgreSQL','pandas','Power BI','Excel'],
    },
    'web-developer':{
      id:'web-developer', title:'Web Developer', icon:'code-2',
      summary:'Builds and ships responsive, accessible web applications from interface to API.',
      demand:'High demand', entry:'₹4 – 9 LPA', openings:'18,900+ entry-level roles',
      required:[
        {skill:'HTML & CSS', level:3, weight:'Core', why:'The foundation of every interface you build.'},
        {skill:'JavaScript', level:3, weight:'Core', why:'Interactivity, state and logic in the browser.'},
        {skill:'React', level:2, weight:'Core', why:'Component-based UIs used across most product teams.'},
        {skill:'Git', level:2, weight:'Important', why:'Collaboration and version control on real codebases.'},
        {skill:'REST APIs', level:2, weight:'Important', why:'Connecting frontends to data and services.'},
      ],
      tools:['VS Code','React','Node.js','Git'],
    },
    'ai-ml-engineer':{
      id:'ai-ml-engineer', title:'AI/ML Engineer', icon:'cpu',
      summary:'Designs, trains and deploys machine-learning models that solve real product problems.',
      demand:'Growing fast', entry:'₹6 – 14 LPA', openings:'6,800+ entry-level roles',
      required:[
        {skill:'Python', level:3, weight:'Core', why:'The working language of ML research and production.'},
        {skill:'Linear Algebra', level:2, weight:'Core', why:'Underpins how models represent and transform data.'},
        {skill:'Machine Learning', level:3, weight:'Core', why:'Model selection, training and evaluation.'},
        {skill:'Statistics', level:2, weight:'Core', why:'Understanding uncertainty, bias and model metrics.'},
        {skill:'SQL', level:2, weight:'Important', why:'Pulling training data from production systems.'},
      ],
      tools:['PyTorch','scikit-learn','Jupyter','Docker'],
    },
    'ui-ux-designer':{
      id:'ui-ux-designer', title:'UI/UX Designer', icon:'pen-tool',
      summary:'Researches user needs and designs clear, usable product experiences.',
      demand:'Steady demand', entry:'₹4 – 8 LPA', openings:'5,200+ entry-level roles',
      required:[
        {skill:'User Research', level:2, weight:'Core', why:'Grounding design decisions in real user needs.'},
        {skill:'Figma', level:3, weight:'Core', why:'The industry-standard tool for interface design.'},
        {skill:'Interaction Design', level:2, weight:'Core', why:'Designing flows, states and feedback.'},
        {skill:'Visual Design', level:2, weight:'Important', why:'Typography, layout and colour for clarity.'},
        {skill:'Prototyping', level:2, weight:'Important', why:'Testing ideas before they are built.'},
      ],
      tools:['Figma','Maze','Notion','FigJam'],
    },
  };

  // Student's current skill levels (0-3). SQL can be upgraded by assessment.
  const baseLevels = { Python:3, Excel:2, C:2, SQL:1, Statistics:1, 'Power BI':0 };

  const roadmap = [
    { id:'sql', n:'01', title:'SQL Fundamentals', skill:'SQL', time:'3 weeks · ~18 hrs', gained:'SQL → Intermediate',
      desc:'SELECT, filtering, JOINs, GROUP BY and subqueries on real datasets.', baseProgress:45,
      resources:15, topics:['SELECT & WHERE','JOINs','GROUP BY & HAVING','Subqueries','Window functions (intro)'] },
    { id:'statistics', n:'02', title:'Statistics for Data Analysis', skill:'Statistics', time:'3 weeks · ~15 hrs', gained:'Statistics → Intermediate',
      desc:'Descriptive stats, distributions, sampling and hypothesis testing in Python.', baseProgress:0,
      resources:13, topics:['Descriptive statistics','Probability & distributions','Sampling','Hypothesis testing','Correlation vs causation'] },
    { id:'powerbi', n:'03', title:'Power BI', skill:'Power BI', time:'2 weeks · ~12 hrs', gained:'Power BI → Intermediate',
      desc:'Data modelling, DAX basics and building a stakeholder-ready dashboard.', baseProgress:0,
      resources:11, topics:['Power Query','Data modelling','DAX basics','Visual best practices','Publishing reports'] },
    { id:'python', n:'04', title:'Python for Analytics & Dev', skill:'Python', time:'3 weeks · ~20 hrs', gained:'Python → Advanced',
      desc:'Pandas, NumPy, data cleaning, object-oriented programming and scripting.', baseProgress:80,
      resources:13, topics:['Python Syntax','Data Structures','Pandas DataFrames','NumPy Arrays','OOP Concepts'] },
    { id:'excel', n:'05', title:'Microsoft Excel Analytics', skill:'Excel', time:'2 weeks · ~10 hrs', gained:'Excel → Advanced',
      desc:'XLOOKUP, Pivot tables, conditional modeling and executive dashboards.', baseProgress:60,
      resources:11, topics:['Pivot Tables','XLOOKUP & Modern Formulas','Data Cleansing','Executive Dashboards'] },
    { id:'machine-learning', n:'06', title:'Machine Learning Foundations', skill:'Machine Learning', time:'3 weeks · ~16 hrs', gained:'ML → Foundations',
      desc:'Supervised learning, classification, linear regression and scikit-learn models.', baseProgress:0,
      resources:7, topics:['Regression Models','Classification & Decision Trees','Model Evaluation','Scikit-Learn'] },
    { id:'git', n:'07', title:'Git & GitHub Version Control', skill:'Git', time:'1 week · ~6 hrs', gained:'Git → Intermediate',
      desc:'Git repositories, branching, merge conflicts, pull requests and open source.', baseProgress:40,
      resources:7, topics:['Git Init & Commits','Branching & Merging','GitHub Pull Requests'] },
    { id:'project', n:'08', title:'Data Analytics Project', skill:'Applied', time:'2 weeks · ~20 hrs', gained:'Portfolio-ready project',
      desc:'Apply SQL, statistics and Power BI on Student Performance Analytics.', baseProgress:0,
      resources:1, topics:['Problem framing','Data pipeline','Analysis','Dashboard','Write-up'] },
    { id:'final', n:'09', title:'Career Readiness Assessment', skill:'Validation', time:'90 minutes', gained:'Verified Data Analyst readiness',
      desc:'A combined assessment across all core skills for your target role.', baseProgress:0,
      resources:0, topics:['SQL','Python','Statistics','Power BI','Case study'] },
  ];

    const resources = {
  "sql": {
    "title": "SQL Fundamentals",
    "why": "SQL is one of the key missing skills for your target career. 9 out of 10 Data Analyst roles list it as a core requirement.",
    "outcome": "Write multi-table queries confidently and answer business questions directly from a database.",
    "featuredYoutubeId": "HXV3zeQKqGY",
    "items": [
      {
        "id": "sql-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "SQL Tutorial - Full Database Course for Beginners",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "4 hrs 20 min",
        "views": "21M views",
        "viewCount": 21000000,
        "isFamous": true,
        "progress": 45,
        "youtubeId": "HXV3zeQKqGY",
        "thumbnail": "https://img.youtube.com/vi/HXV3zeQKqGY/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        "description": "The legendary Mike Dane full database course. Learn schemas, tables, queries, constraints, and relational database architecture.",
        "lessons": [
          "Schema & Tables",
          "SELECT & WHERE Filters",
          "CRUD Operations",
          "Foreign Keys",
          "JOINs & Unions"
        ]
      },
      {
        "id": "sql-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "SQL Course for Beginners [Full Course]",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "3 hrs 10 min",
        "views": "9.8M views",
        "viewCount": 9800000,
        "isFamous": true,
        "progress": 70,
        "youtubeId": "7S_tz1z_5bA",
        "thumbnail": "https://img.youtube.com/vi/7S_tz1z_5bA/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        "description": "Mosh Hamedani teaches practical MySQL, complex multi-table queries, subqueries, and stored procedures with clean real-world code.",
        "lessons": [
          "SELECT clause",
          "INNER JOINs",
          "OUTER JOINs",
          "Compound Join Conditions",
          "Subqueries in SQL"
        ]
      },
      {
        "id": "sql-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "Learn SQL in 1 Hour - SQL Basics for Beginners",
        "provider": "Joey Blue",
        "difficulty": "Beginner",
        "duration": "1 hr 03 min",
        "views": "3.6M views",
        "viewCount": 3600000,
        "isFamous": true,
        "progress": 100,
        "youtubeId": "9Pzj7Aj25lw",
        "thumbnail": "https://img.youtube.com/vi/9Pzj7Aj25lw/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
        "description": "A fast-paced, high-impact crash course that takes you through creating databases, inserting rows, and writing your first analytical queries.",
        "lessons": [
          "CREATE & INSERT",
          "Filtering with WHERE",
          "ORDER BY & GROUP BY",
          "Primary & Foreign Keys"
        ]
      },
      {
        "id": "sql-4",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Database Design Course - Relational Architecture",
        "provider": "freeCodeCamp.org",
        "difficulty": "Intermediate",
        "duration": "8 hrs 15 min",
        "views": "2.8M views",
        "viewCount": 2800000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "ztHopE5Wnpc",
        "thumbnail": "https://img.youtube.com/vi/ztHopE5Wnpc/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=ztHopE5Wnpc",
        "description": "Master entity relationship diagrams, database normalization (1NF, 2NF, 3NF), and production schema design.",
        "lessons": [
          "Entity Relationship Modeling",
          "Normal Forms (1NF, 2NF, 3NF)",
          "Index Optimization",
          "Referential Integrity"
        ]
      },
      {
        "id": "sql-5",
        "type": "Video",
        "icon": "play-circle",
        "title": "SQL Explained in 100 Seconds",
        "provider": "Fireship",
        "difficulty": "Beginner",
        "duration": "2 min",
        "views": "2.2M views",
        "viewCount": 2200000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "zsjvFFKOm3c",
        "thumbnail": "https://img.youtube.com/vi/zsjvFFKOm3c/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=zsjvFFKOm3c",
        "description": "Ultra-fast high-energy breakdown of SQL, ACID compliance, relational tables, and how SQL queries work behind the scenes.",
        "lessons": [
          "Relational concepts",
          "ACID principles",
          "Declarative query syntax"
        ]
      },
      {
        "id": "sql-6",
        "type": "Video",
        "icon": "play-circle",
        "title": "Intermediate SQL Tutorial | Inner/Outer Joins & Use Cases",
        "provider": "Alex The Analyst",
        "difficulty": "Intermediate",
        "duration": "19 min",
        "views": "1.8M views",
        "viewCount": 1800000,
        "isFamous": false,
        "progress": 0,
        "youtubeId": "9URM1_2S0ho",
        "thumbnail": "https://img.youtube.com/vi/9URM1_2S0ho/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=9URM1_2S0ho",
        "description": "Alex Freberg breaks down visual representations of SQL JOINs with practical real-world company data scenarios.",
        "lessons": [
          "Inner vs Outer Joins",
          "Left Join vs Right Join",
          "Full Outer Join caveats",
          "Use cases in Analytics"
        ]
      },
      {
        "id": "sql-7",
        "type": "Video",
        "icon": "play-circle",
        "title": "SQL Basics Tutorial For Beginners | Select + From Statements",
        "provider": "Alex The Analyst",
        "difficulty": "Beginner",
        "duration": "14 min",
        "views": "1.4M views",
        "viewCount": 1400000,
        "isFamous": false,
        "progress": 0,
        "youtubeId": "PyYgERKq25I",
        "thumbnail": "https://img.youtube.com/vi/PyYgERKq25I/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=PyYgERKq25I",
        "description": "Beginner friendly walkthrough of writing clean SELECT, FROM, WHERE, and DISTINCT queries in MySQL.",
        "lessons": [
          "SELECT statements",
          "Column aliasing",
          "WHERE filtering",
          "LIMIT & DISTINCT"
        ]
      },
      {
        "id": "art-sql-gfg",
        "type": "Article",
        "icon": "file-text",
        "title": "SQL Tutorial - Complete Structured Query Language Guide",
        "provider": "GeeksforGeeks",
        "domain": "geeksforgeeks.org",
        "difficulty": "Beginner",
        "duration": "10 min read",
        "views": "1.2M reads on Google",
        "viewCount": 1200000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.geeksforgeeks.org/sql-tutorial/",
        "googleSearchUrl": "https://www.google.com/search?q=SQL+Tutorial+GeeksforGeeks",
        "description": "Ranked #1 on Google for SQL learning. Covers DDL, DML, DQL, PRIMARY KEY constraints, data types, and multi-table filtering.",
        "takeaways": [
          "SQL is divided into DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), and DQL (SELECT)",
          "PRIMARY KEY automatically enforces UNIQUE and NOT NULL constraints on relational columns",
          "FOREIGN KEY maintains referential integrity between parent and child entity tables",
          "Use LIKE with '%' (any characters) and '_' (single character) for wildcard pattern matching"
        ],
        "fullContent": {
          "intro": "Structured Query Language (SQL) is the standard declarative programming language used to manage, query, and manipulate relational databases like PostgreSQL, MySQL, SQL Server, and SQLite. Ranked among Google's top queried technical tutorials worldwide, this guide establishes the foundational architecture every engineer and data analyst relies on daily.",
          "sections": [
            {
              "heading": "1. Core Categories of SQL Commands",
              "text": "SQL commands are categorized based on their functional role:\n• DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE to define schemas.\n• DML (Data Manipulation Language): INSERT, UPDATE, DELETE to modify table records.\n• DQL (Data Query Language): SELECT to retrieve and analyze stored records.\n• DCL (Data Control Language): GRANT, REVOKE to manage role-based database privileges."
            },
            {
              "heading": "2. The Anatomy of an Optimized SELECT Query",
              "text": "A production SQL query specifies the target attributes, source relations, filtering criteria, and ordering constraints:\n\nSELECT department_id, COUNT(*) AS employee_count, ROUND(AVG(salary), 2) AS avg_sal\nFROM employees\nWHERE status = 'Active' AND hire_date >= '2023-01-01'\nGROUP BY department_id\nHAVING COUNT(*) >= 5\nORDER BY avg_sal DESC\nLIMIT 10;\n\nNotice that WHERE filters raw rows before aggregation, while HAVING filters grouped results."
            },
            {
              "heading": "3. Referential Integrity and Constraints",
              "text": "Constraints guard data quality at the database engine level:\n• NOT NULL ensures columns cannot contain missing values.\n• UNIQUE guarantees all row values in the column are distinct.\n• CHECK validates conditional rules (e.g., CHECK (age >= 18)).\n• DEFAULT auto-assigns fallback values if none are supplied during INSERT."
            }
          ]
        }
      },
      {
        "id": "art-sql-w3",
        "type": "Article",
        "icon": "file-text",
        "title": "SQL Joins: INNER, LEFT, RIGHT & FULL OUTER Joins with Visual Walkthrough",
        "provider": "W3Schools",
        "domain": "w3schools.com",
        "difficulty": "Intermediate",
        "duration": "8 min read",
        "views": "980K reads on Google",
        "viewCount": 980000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.w3schools.com/sql/sql_join.asp",
        "googleSearchUrl": "https://www.google.com/search?q=SQL+Joins+W3Schools",
        "description": "The definitive W3Schools guide to combining rows from two or more tables based on a related common key column.",
        "takeaways": [
          "INNER JOIN returns records that have matching keys in BOTH participating tables",
          "LEFT JOIN preserves all rows from the left table, populating NULL for non-matching right columns",
          "RIGHT JOIN preserves all rows from the right table, populating NULL for non-matching left columns",
          "FULL OUTER JOIN returns all rows when there is a match in either left or right table"
        ],
        "fullContent": {
          "intro": "In relational database design, data is normalized across specialized tables to eliminate redundancy. SQL JOIN clauses allow you to reconstruct unified business views on the fly by merging rows using common relational keys (such as customer_id or order_id).",
          "sections": [
            {
              "heading": "1. INNER JOIN Mechanics",
              "text": "An INNER JOIN selects records where the join predicate evaluates to TRUE in both tables:\n\nSELECT o.order_id, c.customer_name, o.order_amount\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id;\n\nIf a customer has placed no orders, or an order has an orphaned customer_id, those records are excluded from the result set."
            },
            {
              "heading": "2. The LEFT JOIN 'Trap' with WHERE Clauses",
              "text": "A frequent bug occurs when junior analysts append a WHERE condition on the right table in a LEFT JOIN:\n\n-- BUG: Converts LEFT JOIN into an INNER JOIN!\nSELECT c.customer_name, o.order_date\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'Completed';\n\nBecause non-matching customers have NULL for o.status, the WHERE clause discards them. To preserve all customers, move the filter into the ON clause: LEFT JOIN orders o ON c.customer_id = o.customer_id AND o.status = 'Completed'."
            }
          ]
        }
      },
      {
        "id": "art-sql-pg",
        "type": "Article",
        "icon": "file-text",
        "title": "PostgreSQL Window Functions Masterclass: ROW_NUMBER, RANK & LAG",
        "provider": "PostgreSQL Tutorial",
        "domain": "postgresqltutorial.com",
        "difficulty": "Advanced",
        "duration": "12 min read",
        "views": "640K reads on Google",
        "viewCount": 640000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.postgresqltutorial.com/postgresql-window-function/",
        "googleSearchUrl": "https://www.google.com/search?q=PostgreSQL+Window+Functions+Tutorial",
        "description": "Google's highest rated deep-dive on analytical window functions. Calculate running totals, percentiles, and row shifts without collapsing rows.",
        "takeaways": [
          "Window functions compute values over a partition of rows while preserving individual row identity",
          "ROW_NUMBER() assigns strictly unique sequential integers regardless of tied values",
          "DENSE_RANK() does not skip rank values after ties, whereas RANK() leaves numerical gaps",
          "LAG() and LEAD() access values from preceding or subsequent rows within the partition without joins"
        ],
        "fullContent": {
          "intro": "Unlike standard aggregate functions (SUM, AVG) which collapse multiple rows into a single summary row, SQL window functions perform calculations across a specified set of table rows while maintaining individual row granularity in the query output.",
          "sections": [
            {
              "heading": "1. The OVER() and PARTITION BY Syntax",
              "text": "The OVER clause defines the calculation window:\n\nSELECT \n  employee_id,\n  department,\n  salary,\n  AVG(salary) OVER(PARTITION BY department) AS dept_avg_salary,\n  salary - AVG(salary) OVER(PARTITION BY department) AS diff_from_dept_avg\nFROM employees;\n\nThis single query shows both individual employee compensation alongside their departmental average."
            },
            {
              "heading": "2. Solving Month-over-Month Growth with LAG()",
              "text": "To compare monthly revenue with the previous month without a messy self-join:\n\nSELECT \n  month,\n  revenue,\n  LAG(revenue, 1) OVER(ORDER BY month) AS prior_month_revenue,\n  ROUND(100.0 * (revenue - LAG(revenue, 1) OVER(ORDER BY month)) / LAG(revenue, 1) OVER(ORDER BY month), 2) AS mom_growth_pct\nFROM monthly_sales;"
            }
          ]
        }
      },
      {
        "id": "asgn-sql-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "E-Commerce Customer Retention & Churn Cohort Query",
        "provider": "Kaggle & Company Data Engineering Challenge",
        "difficulty": "Intermediate",
        "duration": "30 mins",
        "views": "18K solves",
        "viewCount": 18000,
        "progress": 0,
        "description": "Write an aggregate query to identify customers who placed orders in Q1 2025 but made zero purchases in Q2 2025.",
        "scenario": "The Marketing VP at Northwind Retail noticed an increase in customer churn. They need a prioritized list of high-value customers who purchased in Q1 2025 (Jan-Mar) but have zero orders in Q2 2025 (Apr-Jun).",
        "starterDataset": {
          "tables": [
            "customers (customer_id INT, name VARCHAR, region VARCHAR)",
            "orders (order_id INT, customer_id INT, order_date DATE, total_amount DECIMAL, status VARCHAR)"
          ],
          "sampleRows": "customers:\n101 | Sarah Jenkins | North\n102 | David Miller  | South\n103 | Priya Sharma  | East\n\norders:\n501 | 101 | 2025-01-15 | 340.50 | Completed\n502 | 101 | 2025-04-12 | 120.00 | Completed\n503 | 102 | 2025-02-10 | 850.00 | Completed\n504 | 103 | 2025-01-20 | 1450.00| Completed"
        },
        "tasks": [
          "Join customers and orders on customer_id for completed orders",
          "Group by customer_id, name, and region",
          "Use conditional aggregation in HAVING to ensure count of Q1 orders > 0",
          "Ensure count of Q2 orders equals 0",
          "Order results by lifetime spend in descending order"
        ],
        "hints": [
          "SUM(CASE WHEN order_date BETWEEN '2025-01-01' AND '2025-03-31' THEN 1 ELSE 0 END) > 0",
          "SUM(CASE WHEN order_date BETWEEN '2025-04-01' AND '2025-06-30' THEN 1 ELSE 0 END) = 0"
        ],
        "solution": {
          "code": "SELECT \n  c.customer_id,\n  c.name,\n  c.region,\n  ROUND(SUM(o.total_amount), 2) AS lifetime_spend\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'Completed'\nGROUP BY c.customer_id, c.name, c.region\nHAVING \n  SUM(CASE WHEN o.order_date BETWEEN '2025-01-01' AND '2025-03-31' THEN 1 ELSE 0 END) > 0\n  AND SUM(CASE WHEN o.order_date BETWEEN '2025-04-01' AND '2025-06-30' THEN 1 ELSE 0 END) = 0\nORDER BY lifetime_spend DESC;",
          "explanation": "Single table pass with conditional aggregation in HAVING avoids expensive correlated subqueries."
        }
      },
      {
        "id": "test-sql-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Microsoft DP-900 / SQL Industry Certification Diagnostic Test",
        "provider": "Microsoft & HackerRank Benchmark Suite",
        "difficulty": "Beginner",
        "duration": "12 mins",
        "timeLimitSeconds": 720,
        "views": "54K attempts",
        "viewCount": 54000,
        "progress": 0,
        "questionsCount": 6,
        "passScore": 75,
        "description": "Official 6-question certification test covering logical execution order, NULL comparison nuances, GROUP BY constraints, and referential integrity.",
        "testQuestions": [
          {
            "q": "In which logical order does a relational SQL database engine evaluate query clauses?",
            "codeSnippet": "SELECT department, AVG(salary) FROM employees WHERE status = 'Active' GROUP BY department HAVING COUNT(*) > 5 ORDER BY department;",
            "options": [
              "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
              "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
              "WHERE → FROM → SELECT → GROUP BY → HAVING → ORDER BY",
              "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY"
            ],
            "answer": 1,
            "explanation": "FROM and WHERE execute first to assemble and filter the dataset prior to aggregation, projection (SELECT), and sorting.",
            "topic": "Query Execution Architecture",
            "source": "Oracle Database SQL (Exam 1Z0-071) & Microsoft DP-900"
          },
          {
            "q": "What is the boolean evaluation of the SQL predicate: NULL = NULL?",
            "codeSnippet": "SELECT * FROM users WHERE NULL = NULL;",
            "options": [
              "TRUE (Returns all rows)",
              "FALSE (Returns no rows)",
              "UNKNOWN (Treated as false in WHERE filters)",
              "Raises a runtime Syntax Exception"
            ],
            "answer": 2,
            "explanation": "In ANSI three-valued logic, NULL represents an unknown value. Comparing an unknown to an unknown evaluates to UNKNOWN. To test for NULL, always use 'IS NULL'.",
            "topic": "Three-Valued Logic & NULLs",
            "source": "ANSI SQL-92 Standard"
          },
          {
            "q": "Why does the following query fail with an 'Unknown column total_price' error?",
            "codeSnippet": "SELECT unit_price * quantity AS total_price \nFROM order_items \nWHERE total_price > 1000;",
            "options": [
              "Calculated columns cannot use multiplication in SQL",
              "WHERE executes at Step 2 before SELECT column aliases are evaluated at Step 5",
              "The AS keyword is strictly prohibited in SELECT statements",
              "WHERE can only reference integer primary keys"
            ],
            "answer": 1,
            "explanation": "Because WHERE is evaluated before the SELECT projection clause, column aliases created in SELECT do not exist yet when WHERE is filtered. You must repeat the expression in WHERE or use a CTE.",
            "topic": "Logical Clause Pipeline",
            "source": "LeetCode SQL 50 Benchmark"
          },
          {
            "q": "Which clause must be used to filter rows based on the calculated result of an aggregate function such as COUNT() or SUM()?",
            "codeSnippet": "SELECT category_id, COUNT(*) FROM products WHERE COUNT(*) > 10 GROUP BY category_id;",
            "options": [
              "WHERE",
              "HAVING",
              "QUALIFY",
              "FILTER BY"
            ],
            "answer": 1,
            "explanation": "WHERE filters individual table rows before grouping occurs. HAVING is specifically designed to filter aggregated bucket results after GROUP BY.",
            "topic": "Aggregation & Grouping",
            "source": "Microsoft Azure Data Fundamentals"
          },
          {
            "q": "What will happen if an UPDATE statement is executed without a WHERE clause?",
            "codeSnippet": "UPDATE accounts SET balance = balance + 100;",
            "options": [
              "The database updates only the first row in the table",
              "The statement fails with a mandatory WHERE clause error",
              "Every single row in the accounts table will have its balance increased",
              "Only rows with non-null balances are modified"
            ],
            "answer": 2,
            "explanation": "Without a WHERE filter predicate, UPDATE and DELETE commands apply indiscriminately to all records in the table.",
            "topic": "Data Manipulation Safety",
            "source": "PostgreSQL DBA Essentials"
          },
          {
            "q": "Which constraint guarantees that a child table record cannot reference a non-existent parent table identifier?",
            "options": [
              "PRIMARY KEY",
              "UNIQUE",
              "FOREIGN KEY",
              "CHECK"
            ],
            "answer": 2,
            "explanation": "A FOREIGN KEY constraint enforces referential integrity between tables, rejecting orphan rows in child tables.",
            "topic": "Database Integrity Constraints",
            "source": "Relational Database Design Standard"
          }
        ]
      },
      {
        "id": "test-sql-2",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "SQL Window Functions, JOINs & Subqueries Master Exam",
        "provider": "LeetCode & StrataScratch Benchmarks",
        "difficulty": "Intermediate",
        "duration": "15 mins",
        "timeLimitSeconds": 900,
        "views": "41K attempts",
        "viewCount": 41000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 80,
        "description": "5 practical interview questions on RANK vs DENSE_RANK, LAG offsets, Cartesian products, and window framing.",
        "testQuestions": [
          {
            "q": "What values will RANK() and DENSE_RANK() output for the 3rd row when the first two rows tie for 1st place with identical scores?",
            "options": [
              "RANK: 3, DENSE_RANK: 2",
              "RANK: 2, DENSE_RANK: 3",
              "RANK: 2, DENSE_RANK: 2",
              "RANK: 3, DENSE_RANK: 3"
            ],
            "answer": 0,
            "explanation": "RANK leaves a numerical gap after ties (1, 1, 3). DENSE_RANK increments strictly sequentially with zero gaps (1, 1, 2).",
            "topic": "Window Ranking Functions",
            "source": "FAANG SQL Interview Question Bank"
          },
          {
            "q": "How many rows will a CROSS JOIN produce between Table A (15 rows) and Table B (8 rows)?",
            "options": [
              "23 rows (15 + 8)",
              "15 rows (max count)",
              "120 rows (15 × 8 Cartesian product)",
              "8 rows (min count)"
            ],
            "answer": 2,
            "explanation": "A CROSS JOIN pairs every row from the first table with every row from the second table, resulting in 15 * 8 = 120 rows.",
            "topic": "Relational Algebra",
            "source": "HackerRank SQL Practice"
          },
          {
            "q": "Which window function allows you to inspect the value from the preceding row without joining the table back to itself?",
            "options": [
              "LEAD()",
              "LAG()",
              "FIRST_VALUE()",
              "PREV_ROW()"
            ],
            "answer": 1,
            "explanation": "LAG(column, offset) accesses previous rows at a specified physical offset within the partition.",
            "topic": "Offset Window Functions",
            "source": "StrataScratch Data Analyst Benchmark"
          },
          {
            "q": "In a LEFT JOIN, what occurs if you filter columns of the right table using a WHERE clause?",
            "codeSnippet": "SELECT a.*, b.* \nFROM table_a a \nLEFT JOIN table_b b ON a.id = b.a_id \nWHERE b.status = 'Active';",
            "options": [
              "Preserves all rows of table_a and filters table_b",
              "Converts the LEFT JOIN into an INNER JOIN by eliminating NULL rows",
              "Produces a Cartesian product",
              "Throws a SQL compilation warning"
            ],
            "answer": 1,
            "explanation": "Non-matching left rows produce NULL for table_b columns. Since NULL = 'Active' evaluates to UNKNOWN/false, the WHERE drops them, destroying the outer join behavior.",
            "topic": "JOIN Pitfalls",
            "source": "DataCamp SQL Master Exam"
          },
          {
            "q": "Which framing clause tells a window function to calculate a rolling average using the current row and the preceding 2 rows?",
            "options": [
              "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
              "RANGE 3 ROWS PRIOR",
              "PARTITION BY 3 ROWS",
              "WINDOW FRAME 2 PAST"
            ],
            "answer": 0,
            "explanation": "The ROWS BETWEEN 2 PRECEDING AND CURRENT ROW framing clause defines a moving window of 3 rows total.",
            "topic": "Window Framing",
            "source": "PostgreSQL Analytics Guide"
          }
        ]
      }
    ]
  },
  "python": {
    "title": "Python for Data Analytics & Programming",
    "why": "Python is the #1 tool for data cleaning, statistical modeling, machine learning, and automation in modern data teams.",
    "outcome": "Master Python data structures, write scripts with pandas, and build automated data pipelines.",
    "featuredYoutubeId": "rfscVS0vtbw",
    "items": [
      {
        "id": "py-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Learn Python - Full Course for Beginners [Tutorial]",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "4 hrs 26 min",
        "views": "46M views",
        "viewCount": 46000000,
        "isFamous": true,
        "progress": 90,
        "youtubeId": "rfscVS0vtbw",
        "thumbnail": "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "description": "The most viewed Python tutorial on YouTube with over 46 million views. Mike Dane covers variables, data types, functions, loops, and building real projects.",
        "lessons": [
          "Variables & Data Types",
          "Lists, Tuples & Dictionaries",
          "Functions & Return Statements",
          "If Statements & Loops",
          "Building a Calculator & Guessing Game"
        ]
      },
      {
        "id": "py-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Python Full Course for Beginners",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "6 hrs 14 min",
        "views": "42M views",
        "viewCount": 42000000,
        "isFamous": true,
        "progress": 60,
        "youtubeId": "_uQrJ0TkZlc",
        "thumbnail": "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        "description": "A masterclass by Mosh Hamedani with 42 million views covering complete Python syntax, file handling, Excel automation, and building machine learning models.",
        "lessons": [
          "Python Fundamentals",
          "Control Flow & Error Handling",
          "Classes & Object-Oriented Code",
          "Modules & Packages",
          "Excel Spreadsheet Automation with OpenPyXL"
        ]
      },
      {
        "id": "py-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "Python for Beginners - Learn Coding in 1 Hour",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "1 hr 00 min",
        "views": "15M views",
        "viewCount": 15000000,
        "isFamous": true,
        "progress": 100,
        "youtubeId": "kqtD5dpn9C8",
        "thumbnail": "https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=kqtD5dpn9C8",
        "description": "Quick 1-hour fast-track Python video for students who want to get up to speed quickly on core programming logic.",
        "lessons": [
          "Variables & Inputs",
          "Strings & Type Conversion",
          "Comparison & Logical Operators",
          "While Loops & Lists"
        ]
      },
      {
        "id": "py-4",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Python OOP Tutorial: Classes and Instances",
        "provider": "Corey Schafer",
        "difficulty": "Intermediate",
        "duration": "55 min",
        "views": "4.6M views",
        "viewCount": 4600000,
        "isFamous": true,
        "progress": 30,
        "youtubeId": "ZDa-Z5JzLYM",
        "thumbnail": "https://img.youtube.com/vi/ZDa-Z5JzLYM/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
        "description": "Corey Schafer’s famous tutorial series explaining classes, instances, class variables, regular methods, and inheritance in Python.",
        "lessons": [
          "Creating Classes & Instances",
          "Instance Variables vs Class Variables",
          "Inheritance & Subclasses",
          "Special (Magic/Dunder) Methods"
        ]
      },
      {
        "id": "py-5",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Complete Python Pandas Data Science Tutorial!",
        "provider": "Keith Galli",
        "difficulty": "Intermediate",
        "duration": "1 hr 00 min",
        "views": "2.9M views",
        "viewCount": 2900000,
        "isFamous": true,
        "progress": 50,
        "youtubeId": "vmEHCJofslg",
        "thumbnail": "https://img.youtube.com/vi/vmEHCJofslg/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=vmEHCJofslg",
        "description": "Keith Galli walks through reading CSVs, filtering data, sorting, aggregating with groupby, conditional changes, and saving cleaned files.",
        "lessons": [
          "Reading & Inspecting CSV Data",
          "Filtering & Sorting DataFrames",
          "Adding Calculated Columns",
          "Aggregate Statistics (Groupby)",
          "Working with Large Datasets"
        ]
      },
      {
        "id": "art-py-realpython",
        "type": "Article",
        "icon": "file-text",
        "title": "The Ultimate Guide to DataFrames & Data Analysis in Pandas",
        "provider": "Real Python",
        "domain": "realpython.com",
        "difficulty": "Beginner",
        "duration": "11 min read",
        "views": "890K reads on Google",
        "viewCount": 890000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://realpython.com/pandas-dataframe/",
        "googleSearchUrl": "https://www.google.com/search?q=Pandas+DataFrame+Real+Python",
        "description": "Google's #1 ranked Python tutorial on pandas. Learn Series, DataFrames, indexing with .loc vs .iloc, and group aggregations.",
        "takeaways": [
          "DataFrames are two-dimensional, size-mutable tabular structures with labeled axes (rows and columns)",
          ".loc is label-based indexing (inclusive of end bounds), while .iloc is integer position-based (exclusive of end)",
          "Avoid looping with 'for index, row in df.iterrows()' — vectorization is 100x to 1,000x faster",
          "Use df.groupby() with .agg({'col1': 'mean', 'col2': 'count'}) for flexible multi-column analytics"
        ],
        "fullContent": {
          "intro": "Pandas is the cornerstone of Python's data analysis stack. Built on top of high-performance C-optimized NumPy arrays, pandas provides expressive structures and functions that make data manipulation fast and intuitive.",
          "sections": [
            {
              "heading": "1. Understanding Series vs. DataFrame",
              "text": "A Series is a one-dimensional array-like object with an associated index array. A DataFrame is a spreadsheet-like structure containing an ordered collection of columns, each of which can hold a distinct data type (numeric, string, boolean, datetime)."
            },
            {
              "heading": "2. The Golden Rule of Vectorization",
              "text": "Never iterate over rows with Python for-loops. Compare these two approaches for computing tax:\n\n# SLOW: 4.8 seconds on 1M rows\nfor i, row in df.iterrows():\n    df.at[i, 'tax'] = row['price'] * 0.18\n\n# FAST: 0.003 seconds (1,600x faster)\ndf['tax'] = df['price'] * 0.18\n\nVectorized operations delegate execution to underlying C SIMD vector instructions."
            }
          ]
        }
      },
      {
        "id": "art-py-gfg",
        "type": "Article",
        "icon": "file-text",
        "title": "Python Data Structures: Lists, Tuples, Sets and Dictionaries Compared",
        "provider": "GeeksforGeeks",
        "domain": "geeksforgeeks.org",
        "difficulty": "Intermediate",
        "duration": "9 min read",
        "views": "1.4M reads on Google",
        "viewCount": 1400000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.geeksforgeeks.org/python-data-structures/",
        "googleSearchUrl": "https://www.google.com/search?q=Python+Data+Structures+GeeksforGeeks",
        "description": "Ranked top of Google search. Memory footprint, time complexity (O(1) vs O(N)), mutability, and hashing mechanics.",
        "takeaways": [
          "Lists are mutable ordered sequences with dynamic resizing; appending is amortized O(1)",
          "Tuples are immutable sequences, allowing them to serve as dictionary keys and set members",
          "Sets enforce uniqueness and provide average O(1) membership testing via hash tables",
          "Dictionaries store key-value pairs with O(1) average lookup, insertion, and deletion"
        ],
        "fullContent": {
          "intro": "Choosing the correct data structure is the difference between an algorithm that runs in milliseconds versus one that crashes with an out-of-memory exception. This GeeksforGeeks guide evaluates time complexity and memory mechanics.",
          "sections": [
            {
              "heading": "1. Time Complexity Cheat Sheet",
              "text": "Operation | List | Set | Dict\nLookup by Index: O(1) | N/A | N/A\nLookup by Value: O(N) | O(1) | O(1) (key)\nAppend / Insert: O(1) | O(1) | O(1)\nDelete: O(N) | O(1) | O(1)"
            }
          ]
        }
      },
      {
        "id": "asgn-py-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Customer Churn Feature Engineering & Outlier Cleaning Pipeline",
        "provider": "Kaggle Production Notebook Scenario",
        "difficulty": "Intermediate",
        "duration": "35 mins",
        "views": "22K solves",
        "viewCount": 22000,
        "progress": 0,
        "description": "Write a vectorized data pipeline to clean missing data, encode categorical variables, and compute tenure-to-spend ratios.",
        "scenario": "You are handed a raw customer churn dataset with missing billing numbers, string-formatted dates, and outlier monthly charges. Build a reproducible cleaning pipeline.",
        "starterDataset": {
          "tables": [
            "customers_df: [customer_id, tenure_months, monthly_charges, total_charges, contract_type]"
          ],
          "sampleRows": "1 | 12 | 65.50  | 786.00 | Month-to-month\n2 |  0 | 20.10  | ' '    | One year\n3 | 48 | 110.20 | 5289.60| Two year"
        },
        "tasks": [
          "Convert total_charges to numeric, coercing invalid spaces to NaN",
          "Impute missing total_charges with tenure_months * monthly_charges",
          "Create a new feature 'spend_per_month_ratio' = total_charges / np.maximum(tenure_months, 1)",
          "One-hot encode contract_type using pd.get_dummies()",
          "Filter out rows where monthly_charges exceed 3 standard deviations from mean"
        ],
        "hints": [
          "pd.to_numeric(df['total_charges'], errors='coerce')",
          "df['total_charges'].fillna(df['tenure_months'] * df['monthly_charges'])"
        ],
        "solution": {
          "code": "import pandas as pd\nimport numpy as np\n\ndef clean_pipeline(df):\n    df = df.copy()\n    df['total_charges'] = pd.to_numeric(df['total_charges'], errors='coerce')\n    df['total_charges'] = df['total_charges'].fillna(df['tenure_months'] * df['monthly_charges'])\n    df['spend_ratio'] = df['total_charges'] / np.maximum(df['tenure_months'], 1)\n    df = pd.get_dummies(df, columns=['contract_type'], drop_first=True)\n    mean, std = df['monthly_charges'].mean(), df['monthly_charges'].std()\n    df = df[df['monthly_charges'].between(mean - 3*std, mean + 3*std)]\n    return df",
          "explanation": "Vectorized pandas transformations avoid looping and handle real-world type casting."
        }
      },
      {
        "id": "test-py-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Python Institute PCEP & Data Analytics Industry Quiz",
        "provider": "Python Institute & HackerRank Test Suite",
        "difficulty": "Beginner",
        "duration": "15 mins",
        "timeLimitSeconds": 900,
        "views": "48K attempts",
        "viewCount": 48000,
        "progress": 0,
        "questionsCount": 6,
        "passScore": 75,
        "description": "6 practical questions on mutability, dictionary comprehensions, pandas vectorization, and lambda functions.",
        "testQuestions": [
          {
            "q": "What is the output of the following Python snippet?",
            "codeSnippet": "def append_to(val, my_list=[]):\n    my_list.append(val)\n    return my_list\n\nprint(append_to(1))\nprint(append_to(2))",
            "options": [
              "[1] then [2]",
              "[1] then [1, 2]",
              "Throws an UnboundLocalError",
              "[1, 2] both times"
            ],
            "answer": 1,
            "explanation": "Default parameter values in Python are evaluated once when the function is defined, not upon each call. The mutable list is shared across invocations.",
            "topic": "Mutable Default Arguments",
            "source": "Python Institute PCEP Exam"
          },
          {
            "q": "Which pandas indexing operator uses strictly integer-based positional indexing (exclusive of stop index)?",
            "options": [
              ".loc[]",
              ".iloc[]",
              ".ix[]",
              ".at[]"
            ],
            "answer": 1,
            "explanation": ".iloc is strictly position-based (0 to length-1). .loc is label-based and includes both start and stop labels.",
            "topic": "Pandas Indexing",
            "source": "DataCamp Python Benchmark"
          },
          {
            "q": "What is the time complexity of checking if an element exists in a Python set: 'x in my_set'?",
            "options": [
              "O(N)",
              "O(log N)",
              "O(1) average case",
              "O(N²)"
            ],
            "answer": 2,
            "explanation": "Sets are implemented as hash tables in CPython. Element lookups compute the hash and resolve buckets in O(1) average time.",
            "topic": "Data Structure Complexity",
            "source": "HackerRank Python Certification"
          },
          {
            "q": "Which method is the most efficient way to handle missing values (NaN) in a numeric pandas column?",
            "codeSnippet": "# Goal: Replace missing ages with median age\ndf['age'].fillna(df['age'].median(), inplace=True)",
            "options": [
              "Using a for-loop with if math.isnan()",
              "df['age'].fillna(df['age'].median())",
              "Dropping all rows using df.dropna() without checking",
              "Replacing with string 'Unknown'"
            ],
            "answer": 1,
            "explanation": "Vectorized .fillna() calculates the median and updates missing values in C without loop overhead.",
            "topic": "Data Cleaning",
            "source": "Kaggle Data Cleaning Course"
          },
          {
            "q": "What does the expression [x**2 for x in range(10) if x % 2 == 0] produce?",
            "options": [
              "[0, 4, 16, 36, 64]",
              "[1, 9, 25, 49, 81]",
              "[0, 2, 4, 6, 8]",
              "[0, 1, 4, 9, 16]"
            ],
            "answer": 0,
            "explanation": "Filters even numbers (0, 2, 4, 6, 8) and squares them: 0, 4, 16, 36, 64.",
            "topic": "List Comprehensions",
            "source": "LeetCode Python Essentials"
          },
          {
            "q": "How can you merge two dictionaries in Python 3.9+ using the union operator?",
            "options": [
              "dict1.add(dict2)",
              "merged = dict1 | dict2",
              "merged = dict1 + dict2",
              "merged = dict1.union(dict2)"
            ],
            "answer": 1,
            "explanation": "PEP 584 introduced the '|' merge operator for dictionaries in Python 3.9.",
            "topic": "Modern Python Syntax",
            "source": "Real Python Advanced Guide"
          }
        ]
      }
    ]
  },
  "excel": {
    "title": "Microsoft Excel & Business Analytics",
    "why": "Excel remains the standard tool for quick financial models, stakeholder-ready spreadsheets, and ad-hoc data analysis.",
    "outcome": "Master XLOOKUP, dynamic array functions, Pivot Tables, and build automated KPI dashboards.",
    "featuredYoutubeId": "Vl0H-qTclOg",
    "items": [
      {
        "id": "ex-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Microsoft Excel Tutorial for Beginners - Full Course",
        "provider": "Kevin Stratvert",
        "difficulty": "Beginner",
        "duration": "2 hrs 18 min",
        "views": "9.8M views",
        "viewCount": 9800000,
        "isFamous": true,
        "progress": 65,
        "youtubeId": "Vl0H-qTclOg",
        "thumbnail": "https://img.youtube.com/vi/Vl0H-qTclOg/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=Vl0H-qTclOg",
        "description": "The most popular Excel tutorial on YouTube. Former Microsoft PM Kevin Stratvert teaches formulas, charts, tables, formatting, and Pivot Tables.",
        "lessons": [
          "Navigating the Excel Interface",
          "Essential Formulas (SUM, AVERAGE, COUNT)",
          "Working with Tables & Styles",
          "Creating Charts & Visuals",
          "Pivot Table Foundations"
        ]
      },
      {
        "id": "ex-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Excel Tutorial for Beginners | How to Use Excel",
        "provider": "Leila Gharani",
        "difficulty": "Beginner",
        "duration": "40 min",
        "views": "6.5M views",
        "viewCount": 6500000,
        "isFamous": true,
        "progress": 30,
        "youtubeId": "0tdlR1rBwkM",
        "thumbnail": "https://img.youtube.com/vi/0tdlR1rBwkM/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=0tdlR1rBwkM",
        "description": "Microsoft MVP Leila Gharani teaches best practices for setting up spreadsheets, flash fill, data validation, and clean layout design.",
        "lessons": [
          "Data Entry & Flash Fill",
          "Formulas vs Functions",
          "Conditional Formatting",
          "Data Validation Dropdowns"
        ]
      },
      {
        "id": "ex-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "The Beginner's Guide to Excel - Excel Basics",
        "provider": "Technology for Teachers",
        "difficulty": "Beginner",
        "duration": "54 min",
        "views": "3.8M views",
        "viewCount": 3800000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "rwbho0CgEAE",
        "thumbnail": "https://img.youtube.com/vi/rwbho0CgEAE/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=rwbho0CgEAE",
        "description": "Comprehensive beginner guide explaining rows, columns, cell referencing, relative vs absolute formulas, and auto-sum.",
        "lessons": [
          "Cell References (A1 vs $A$1)",
          "Auto-fill handle & series",
          "Basic Math Operations",
          "Printing & Page Setup"
        ]
      },
      {
        "id": "ex-4",
        "type": "Video",
        "icon": "play-circle",
        "title": "How an Excel Pro Uses XLOOKUP (R.I.P. VLOOKUP & INDEX MATCH)",
        "provider": "Leila Gharani",
        "difficulty": "Intermediate",
        "duration": "14 min",
        "views": "2.4M views",
        "viewCount": 2400000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "xnLvEhXWSas",
        "thumbnail": "https://img.youtube.com/vi/xnLvEhXWSas/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=xnLvEhXWSas",
        "description": "Detailed comparison showing why XLOOKUP replaces VLOOKUP and INDEX MATCH with exact matching, default values, and two-way lookups.",
        "lessons": [
          "Basic XLOOKUP Syntax",
          "Handling #N/A with if_not_found",
          "Two-way Matrix Lookups",
          "Horizontal & Vertical lookups"
        ]
      },
      {
        "id": "art-ex-mslearn",
        "type": "Article",
        "icon": "file-text",
        "title": "XLOOKUP vs VLOOKUP & INDEX-MATCH: Official Microsoft Function Guide",
        "provider": "Microsoft Learn",
        "domain": "learn.microsoft.com",
        "difficulty": "Intermediate",
        "duration": "7 min read",
        "views": "1.1M reads on Google",
        "viewCount": 1100000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929",
        "googleSearchUrl": "https://www.google.com/search?q=XLOOKUP+vs+VLOOKUP+Microsoft+Learn",
        "description": "Official Microsoft documentation on why XLOOKUP replaces VLOOKUP and HLOOKUP with exact match default and leftward lookups.",
        "takeaways": [
          "XLOOKUP looks both right and left without requiring column index counting",
          "Defaults to exact match (no more forgotten FALSE / 0 argument)",
          "Has a built-in 'if_not_found' parameter, eliminating nested =IFERROR(VLOOKUP(...), 'Not Found')",
          "Does not break when columns are inserted or deleted in the source range"
        ],
        "fullContent": {
          "intro": "For decades, VLOOKUP was the most widely used lookup function in business. However, it had severe architectural limitations: it could only look left-to-right, required fragile hardcoded column numbers, and defaulted to dangerous approximate matches. XLOOKUP solves all of these.",
          "sections": [
            {
              "heading": "1. Syntax Breakdown",
              "text": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])\n\nExample:\n=XLOOKUP(E2, A2:A100, C2:C100, 'Employee Not Found')\n\nIf someone inserts a column between A and C, the formula automatically updates seamlessly."
            }
          ]
        }
      },
      {
        "id": "art-ex-gfg",
        "type": "Article",
        "icon": "file-text",
        "title": "Executive Dashboards & Dynamic Pivot Tables in Excel",
        "provider": "GeeksforGeeks",
        "domain": "geeksforgeeks.org",
        "difficulty": "Beginner",
        "duration": "8 min read",
        "views": "720K reads on Google",
        "viewCount": 720000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.geeksforgeeks.org/how-to-create-a-pivot-table-in-excel/",
        "googleSearchUrl": "https://www.google.com/search?q=Pivot+Tables+Excel+GeeksforGeeks",
        "description": "Google top result for creating interactive corporate dashboards, connecting slicers, calculated fields, and KPI trend charts.",
        "takeaways": [
          "Always convert raw tabular data into an Excel Table (Ctrl+T) before creating Pivot Tables",
          "Use Slicers connected via 'Report Connections' to filter multiple Pivot Charts simultaneously",
          "Calculated Fields permit new metrics (e.g. Profit Margin) without altering raw data",
          "Follow the 60-30-10 color rule for corporate executive dashboards"
        ],
        "fullContent": {
          "intro": "Corporate executives demand high-signal dashboards that allow them to slice by region, product category, and fiscal quarter at a glance. Pivot Tables combined with Slicers are the fastest way to build interactive BI tools directly inside Excel.",
          "sections": [
            {
              "heading": "1. Converting Data to Tables First",
              "text": "Always press Ctrl+T to make your source range a dynamic Excel Table. When new rows are appended next month, all connected Pivot Tables expand their data range automatically upon clicking 'Refresh All'."
            }
          ]
        }
      },
      {
        "id": "asgn-ex-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Regional Sales Commission & Tiered Bonus Model",
        "provider": "Financial Analyst Modeling Challenge",
        "difficulty": "Intermediate",
        "duration": "30 mins",
        "views": "15K solves",
        "viewCount": 15000,
        "progress": 0,
        "description": "Build an automated commission calculator with tiered bonus brackets, XLOOKUP employee lookups, and conditional formatting.",
        "scenario": "The VP of Sales needs a dynamic commission calculator. Reps receive 5% base commission on sales up to $50,000, 8% between $50,000 and $100,000, and 12% on revenue exceeding $100,000.",
        "starterDataset": {
          "tables": [
            "Sales Reps: Rep_ID, Rep_Name, Region, Q1_Sales"
          ],
          "sampleRows": "R101 | Ananya Roy   | North | $145,000\nR102 | Vikram Patel | South | $42,000\nR103 | Sara Khan    | West  | $88,000"
        },
        "tasks": [
          "Use XLOOKUP to populate Rep_Name and Region from the master employee sheet",
          "Write a nested IF or IFS formula to compute tiered commissions",
          "Highlight top 10% performers using Conditional Formatting green data bars",
          "Create a Summary Pivot Table with average commission by Region"
        ],
        "hints": [
          "=IFS(Sales>100000, 50000*0.05 + 50000*0.08 + (Sales-100000)*0.12, Sales>50000, 50000*0.05 + (Sales-50000)*0.08, TRUE, Sales*0.05)"
        ],
        "solution": {
          "code": "=IFS(D2>100000, (50000*0.05)+(50000*0.08)+((D2-100000)*0.12), D2>50000, (50000*0.05)+((D2-50000)*0.08), TRUE, D2*0.05)",
          "explanation": "Tiered marginal calculation applies appropriate rates to each bracket slice rather than flat taxing the entire sum."
        }
      },
      {
        "id": "test-ex-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Microsoft Office Specialist (MOS) Excel Certification Exam",
        "provider": "Microsoft MO-200 Exam Standards",
        "difficulty": "Intermediate",
        "duration": "12 mins",
        "timeLimitSeconds": 720,
        "views": "39K attempts",
        "viewCount": 39000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "Official 5-question test on XLOOKUP, absolute cell references ($), INDEX-MATCH, and Pivot Table aggregation.",
        "testQuestions": [
          {
            "q": "What is the primary advantage of XLOOKUP over VLOOKUP?",
            "options": [
              "XLOOKUP only works with sorted data",
              "XLOOKUP can lookup values to the left of the lookup column and defaults to exact match",
              "XLOOKUP requires INDEX-MATCH helper columns",
              "XLOOKUP converts numbers to text automatically"
            ],
            "answer": 1,
            "explanation": "XLOOKUP supports bidirectional lookups (left or right) and defaults to exact match without fragile column numbering.",
            "topic": "Advanced Lookup Formulas",
            "source": "Microsoft MOS Excel (MO-200)"
          },
          {
            "q": "What does the formula =$B$2 * C2 do when dragged down from row 2 to row 5?",
            "options": [
              "Multiplies B2 by C2, then B3 by C3, B4 by C4",
              "Keeps B2 fixed (absolute reference) and multiplies by C3, C4, C5 sequentially",
              "Causes a #REF! circular reference error",
              "Multiplies column B by row 2"
            ],
            "answer": 1,
            "explanation": "The dollar signs in $B$2 freeze both the column and row. C2 is relative and adjusts dynamically to C3, C4, C5.",
            "topic": "Cell Referencing Mechanics",
            "source": "Corporate Finance Institute (CFI)"
          },
          {
            "q": "Which error occurs in Excel if a lookup function cannot find the requested value in the range?",
            "options": [
              "#VALUE!",
              "#N/A",
              "#NAME?",
              "#NULL!"
            ],
            "answer": 1,
            "explanation": "#N/A stands for 'Not Available' and is returned by lookup functions when no match exists.",
            "topic": "Formula Error Handling",
            "source": "Excel Formula Diagnostics"
          },
          {
            "q": "How do you connect a single Slicer to control multiple Pivot Tables on the same worksheet?",
            "options": [
              "Copy-paste the slicer next to each pivot table",
              "Right-click the Slicer and select 'Report Connections'",
              "Write a VBA macro",
              "Merge the pivot tables into one table"
            ],
            "answer": 1,
            "explanation": "Report Connections links a slicer to any Pivot Table sharing the same underlying data cache.",
            "topic": "Pivot Table Dashboarding",
            "source": "Microsoft Learn Excel Expert"
          },
          {
            "q": "Which function calculates the sum of cells in range D2:D100 only where column A equals 'West' and column B is greater than 500?",
            "options": [
              "=SUMIF(A2:A100, 'West', D2:D100)",
              "=SUMIFS(D2:D100, A2:A100, 'West', B2:B100, '>500')",
              "=TOTAL(D2:D100, 'West', 500)",
              "=COUNTIFS(D2:D100, 'West')"
            ],
            "answer": 1,
            "explanation": "=SUMIFS takes the sum_range first, followed by pairs of criteria_range and criteria.",
            "topic": "Multi-Criteria Aggregations",
            "source": "Wall Street Prep Financial Modeling"
          }
        ]
      }
    ]
  },
  "statistics": {
    "title": "Statistics for Data Analysis",
    "why": "Statistics helps you interpret results correctly — a core expectation in analyst interviews.",
    "outcome": "Summarise data, test hypotheses and explain uncertainty in plain language.",
    "featuredYoutubeId": "HZGCoVF3YvM",
    "items": [
      {
        "id": "stat-1",
        "type": "Video",
        "icon": "play-circle",
        "title": "Bayes Theorem, the Geometry of Changing Beliefs",
        "provider": "3Blue1Brown",
        "difficulty": "Intermediate",
        "duration": "15 min",
        "views": "5.4M views",
        "viewCount": 5400000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "HZGCoVF3YvM",
        "thumbnail": "https://img.youtube.com/vi/HZGCoVF3YvM/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=HZGCoVF3YvM",
        "description": "Grant Sanderson’s viral visual explanation of probability, prior beliefs, likelihood ratios, and Bayesian inference with beautiful animations.",
        "lessons": [
          "Prior Probability",
          "Conditional Probability",
          "Bayes Rule in Action",
          "Medical Testing Paradox"
        ]
      },
      {
        "id": "stat-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Statistics - A Full University Course on Data Science Basics",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "8 hrs 15 min",
        "views": "4.5M views",
        "viewCount": 4500000,
        "isFamous": true,
        "progress": 20,
        "youtubeId": "xxpc-HPKN28",
        "thumbnail": "https://img.youtube.com/vi/xxpc-HPKN28/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=xxpc-HPKN28",
        "description": "Complete university-level statistics curriculum taught by Monika Wahi covering descriptive statistics, distributions, and inferential tests.",
        "lessons": [
          "Descriptive Statistics (Mean, Median, Mode)",
          "Variance & Standard Deviation",
          "Central Limit Theorem",
          "Sampling & Bias"
        ]
      },
      {
        "id": "stat-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "p-values: What They Are and How to Interpret Them",
        "provider": "StatQuest with Josh Starmer",
        "difficulty": "Beginner",
        "duration": "11 min",
        "views": "3.2M views",
        "viewCount": 3200000,
        "isFamous": true,
        "progress": 40,
        "youtubeId": "vemZtEM63GY",
        "thumbnail": "https://img.youtube.com/vi/vemZtEM63GY/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=vemZtEM63GY",
        "description": "Josh Starmer strips away mathematical jargon to explain p-values, the null hypothesis, and statistical significance with clear visual diagrams.",
        "lessons": [
          "The Null Hypothesis (H0)",
          "Calculating p-value",
          "Alpha threshold (0.05)",
          "Common Misinterpretations"
        ]
      },
      {
        "id": "stat-4",
        "type": "Video",
        "icon": "play-circle",
        "title": "StatQuest: Histograms, Clearly Explained",
        "provider": "StatQuest with Josh Starmer",
        "difficulty": "Beginner",
        "duration": "6 min",
        "views": "2.1M views",
        "viewCount": 2100000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "qBigTkBLU6g",
        "thumbnail": "https://img.youtube.com/vi/qBigTkBLU6g/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=qBigTkBLU6g",
        "description": "Why histograms matter, how bin size changes data visualization, and how to read skewness and kurtosis.",
        "lessons": [
          "Binning Data",
          "Frequency counts",
          "Skewed vs Normal distributions"
        ]
      },
      {
        "id": "stat-5",
        "type": "Video",
        "icon": "play-circle",
        "title": "Hypothesis Testing and The Null Hypothesis, Clearly Explained!",
        "provider": "StatQuest with Josh Starmer",
        "difficulty": "Beginner",
        "duration": "14 min",
        "views": "1.9M views",
        "viewCount": 1900000,
        "isFamous": false,
        "progress": 0,
        "youtubeId": "0oc49DyA3hU",
        "thumbnail": "https://img.youtube.com/vi/0oc49DyA3hU/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=0oc49DyA3hU",
        "description": "A step-by-step breakdown of how to formulate hypotheses, test statistical validity, and avoid Type I & Type II errors.",
        "lessons": [
          "Formulating H0 and H1",
          "One-tailed vs Two-tailed tests",
          "Confidence intervals"
        ]
      },
      {
        "id": "stat-6",
        "type": "Video",
        "icon": "play-circle",
        "title": "The Normal Distribution, Clearly Explained!",
        "provider": "StatQuest with Josh Starmer",
        "difficulty": "Beginner",
        "duration": "16 min",
        "views": "1.6M views",
        "viewCount": 1600000,
        "isFamous": false,
        "progress": 0,
        "youtubeId": "rzFX5NWojp0",
        "thumbnail": "https://img.youtube.com/vi/rzFX5NWojp0/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=rzFX5NWojp0",
        "lessons": [
          "The Gaussian Bell Curve",
          "Standard Deviation (68-95-99.7 Rule)",
          "Z-score normalization"
        ],
        "description": "Understand the bell curve, standard scores, and how real-world data aligns with the empirical rule."
      },
      {
        "id": "art-stat-towardsds",
        "type": "Article",
        "icon": "file-text",
        "title": "Hypothesis Testing, p-Values & Confidence Intervals Explained",
        "provider": "Towards Data Science",
        "domain": "towardsdatascience.com",
        "difficulty": "Intermediate",
        "duration": "10 min read",
        "views": "820K reads on Google",
        "viewCount": 820000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://towardsdatascience.com/hypothesis-testing-explained-as-simply-as-possible-b09e4d1f2b6e",
        "googleSearchUrl": "https://www.google.com/search?q=Hypothesis+Testing+p-values+Towards+Data+Science",
        "description": "Google top result for data analysts. Demystifies Null Hypothesis (H0), Type I vs Type II errors, and statistical significance.",
        "takeaways": [
          "The p-value is the probability of observing data at least as extreme as observed, assuming the Null Hypothesis (H0) is true",
          "A p-value < 0.05 does NOT mean the effect is large — it only means it is unlikely to be random noise",
          "Type I error (False Positive) is rejecting a true H0; Type II error (False Negative) is failing to reject a false H0",
          "Always report Confidence Intervals alongside p-values to communicate practical effect size"
        ],
        "fullContent": {
          "intro": "In data analytics, decisions can never be based on raw sample averages alone. If Variant B generated a 3.4% conversion rate versus Variant A's 3.1%, is that a genuine product improvement or random variance? Hypothesis testing gives you rigorous mathematical backing.",
          "sections": [
            {
              "heading": "1. The 4 Steps of Hypothesis Testing",
              "text": "1. State H0 (Null: No difference) and H1 (Alternative: Real difference).\n2. Choose significance threshold alpha (typically α = 0.05).\n3. Compute test statistic (t-score or z-score) and corresponding p-value.\n4. Make decision: If p <= alpha, reject H0; otherwise fail to reject H0."
            }
          ]
        }
      },
      {
        "id": "asgn-stat-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "A/B Test Conversion Rate Significance Calculator",
        "provider": "Product Analytics Industry Case Study",
        "difficulty": "Intermediate",
        "duration": "30 mins",
        "views": "16K solves",
        "viewCount": 16000,
        "progress": 0,
        "description": "Analyze a two-sample z-test on a live checkout button redesign: 12,000 visitors, compute z-score and 95% confidence interval.",
        "scenario": "Control (Variant A): 12,000 visitors, 720 conversions (6.0%). Treatment (Variant B): 12,000 visitors, 840 conversions (7.0%). Decide whether the product team should ship Variant B to 100% of users.",
        "starterDataset": {
          "tables": [
            "Control: N1=12000, X1=720. Treatment: N2=12000, X2=840."
          ],
          "sampleRows": "p1 = 0.060 | p2 = 0.070 | Pooled p = (720+840)/(24000) = 0.065"
        },
        "tasks": [
          "Calculate pooled proportion p_pool and standard error SE",
          "Compute the z-test statistic: z = (p2 - p1) / SE",
          "Determine the two-tailed p-value corresponding to the z-score",
          "Calculate the 95% Confidence Interval for the difference in proportions",
          "Formulate business recommendation with minimum detectable effect"
        ],
        "hints": [
          "SE = sqrt(p_pool * (1 - p_pool) * (1/N1 + 1/N2))",
          "If |z| > 1.96, the difference is statistically significant at α = 0.05"
        ],
        "solution": {
          "code": "import scipy.stats as stats\nimport math\n\np1, n1 = 720/12000, 12000\np2, n2 = 840/12000, 12000\np_pool = (720 + 840) / (n1 + n2)\nse = math.sqrt(p_pool * (1 - p_pool) * (1/n1 + 1/n2))\nz = (p2 - p1) / se # z ≈ 3.14\np_val = 2 * (1 - stats.norm.cdf(abs(z))) # p ≈ 0.0017\n# Decision: p < 0.05 -> Reject H0. Ship Variant B!",
          "explanation": "With z ≈ 3.14 and p ≈ 0.0017, the 1.0% conversion uplift is statistically significant with < 0.2% probability of random chance."
        }
      },
      {
        "id": "test-stat-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Inferential Statistics & A/B Testing Diagnostic Exam",
        "provider": "Data Science Council of America (DASCA)",
        "difficulty": "Intermediate",
        "duration": "12 mins",
        "timeLimitSeconds": 720,
        "views": "31K attempts",
        "viewCount": 31000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on Central Limit Theorem, p-value misinterpretations, variance, and sample size.",
        "testQuestions": [
          {
            "q": "What does a p-value of 0.03 strictly indicate in an A/B test with alpha = 0.05?",
            "options": [
              "There is a 97% probability that the alternative hypothesis is true",
              "Assuming no real difference exists (H0), there is a 3% probability of observing results this extreme",
              "The treatment will produce a 3% revenue boost",
              "3% of the experimental samples were contaminated"
            ],
            "answer": 1,
            "explanation": "A p-value is P(Data | H0), not P(H0 | Data). It measures compatibility with the null hypothesis.",
            "topic": "Hypothesis Testing",
            "source": "American Statistical Association (ASA) Guidelines"
          },
          {
            "q": "What does the Central Limit Theorem (CLT) guarantee?",
            "options": [
              "All raw population datasets follow a normal distribution",
              "The sampling distribution of the sample mean approaches a normal distribution as sample size N grows, regardless of population shape",
              "Larger samples always eliminate systematic bias",
              "The median equals the mean in all distributions"
            ],
            "answer": 1,
            "explanation": "CLT states that sample means will be normally distributed around the true population mean for sufficiently large N (typically N >= 30).",
            "topic": "Sampling Distributions",
            "source": "OpenIntro Statistics"
          },
          {
            "q": "In a medical diagnosis test, what is a Type I error?",
            "options": [
              "Diagnosing a healthy patient as sick (False Positive)",
              "Diagnosing a sick patient as healthy (False Negative)",
              "Losing laboratory test samples",
              "Correctly identifying a healthy patient"
            ],
            "answer": 0,
            "explanation": "Type I error (α) is rejecting the true null hypothesis (falsely alarming that a disease is present when it isn't).",
            "topic": "Statistical Errors",
            "source": "Biostatistics Fundamentals"
          },
          {
            "q": "Which metric of central tendency is most robust to extreme outliers in a heavily right-skewed salary distribution?",
            "options": [
              "Mean (Average)",
              "Median (50th percentile)",
              "Midrange",
              "Standard Deviation"
            ],
            "answer": 1,
            "explanation": "The median divides the ordered distribution in half and is unaffected by billionaires or extreme outliers at the tail.",
            "topic": "Descriptive Statistics",
            "source": "Kaggle Statistics Course"
          },
          {
            "q": "If two variables have a Pearson correlation coefficient of r = 0.0, what does this prove?",
            "options": [
              "The two variables have zero relationship of any kind",
              "There is no LINEAR relationship between the two variables",
              "Both variables follow a standard normal distribution",
              "One variable causes the other to stay constant"
            ],
            "answer": 1,
            "explanation": "Pearson's r measures strictly linear relationships. Two variables can have a strong non-linear relationship (e.g. y = x^2) and still have r = 0.",
            "topic": "Correlation vs Causation",
            "source": "Harvard Statistics 110"
          }
        ]
      }
    ]
  },
  "powerbi": {
    "title": "Power BI & Business Intelligence",
    "why": "Power BI is listed in most entry-level analyst roles for building dashboards that business teams use.",
    "outcome": "Model data and publish an interactive dashboard from scratch.",
    "featuredYoutubeId": "TmhQCQr_DCA",
    "items": [
      {
        "id": "pbi-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "How to use Microsoft Power BI - Tutorial for Beginners",
        "provider": "Kevin Stratvert",
        "difficulty": "Beginner",
        "duration": "45 min",
        "views": "5.2M views",
        "viewCount": 5200000,
        "isFamous": true,
        "progress": 20,
        "youtubeId": "TmhQCQr_DCA",
        "thumbnail": "https://img.youtube.com/vi/TmhQCQr_DCA/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=TmhQCQr_DCA",
        "description": "Kevin Stratvert’s #1 ranked Power BI tutorial with 5.2 million views. Learn importing Excel datasets, transforming in Power Query, and building visuals.",
        "lessons": [
          "Importing Excel & CSV Datasets",
          "Power Query Data Cleaning",
          "Creating Bar Charts & Maps",
          "Interactive Slicers & Filters",
          "Publishing to Power BI Service"
        ]
      },
      {
        "id": "pbi-2",
        "type": "Video",
        "icon": "play-circle",
        "title": "How to use Power BI DAX - Tutorial for Beginners",
        "provider": "Kevin Stratvert",
        "difficulty": "Intermediate",
        "duration": "28 min",
        "views": "2.4M views",
        "viewCount": 2400000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "waG_JhBgUpM",
        "thumbnail": "https://img.youtube.com/vi/waG_JhBgUpM/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=waG_JhBgUpM",
        "description": "Master Data Analysis Expressions (DAX) step-by-step. Understand calculated columns vs measures, CALCULATE, and SUMX.",
        "lessons": [
          "Calculated Columns vs Measures",
          "Implicit vs Explicit Measures",
          "The CALCULATE Function",
          "Time Intelligence (YTD/MTD)"
        ]
      },
      {
        "id": "pbi-3",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Power BI FULL COURSE for Beginners | Learn Dashboards Fast!",
        "provider": "Pragmatic Works",
        "difficulty": "Beginner",
        "duration": "3 hrs 20 min",
        "views": "2.2M views",
        "viewCount": 2200000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "Dk25lwdTKow",
        "thumbnail": "https://img.youtube.com/vi/Dk25lwdTKow/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=Dk25lwdTKow",
        "description": "Full end-to-end Power BI masterclass covering star schema data modeling, relationship cardinality (1-to-many), and enterprise report styling.",
        "lessons": [
          "Star Schema Modeling",
          "Relationship Cardinality",
          "Report Theme Customization",
          "Drill-through Pages & Tooltips"
        ]
      },
      {
        "id": "pbi-4",
        "type": "Video",
        "icon": "play-circle",
        "title": "Power BI Tutorial for Beginners (Step-by-Step in 30 Minutes)",
        "provider": "Guy in a Cube",
        "difficulty": "Beginner",
        "duration": "31 min",
        "views": "1.8M views",
        "viewCount": 1800000,
        "isFamous": false,
        "progress": 0,
        "youtubeId": "OmW9YvxSl1E",
        "thumbnail": "https://img.youtube.com/vi/OmW9YvxSl1E/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=OmW9YvxSl1E",
        "description": "Patrick from Guy in a Cube shows how to connect data sources, shape tables, and create stunning visual reports in 30 minutes.",
        "lessons": [
          "Rapid Report Prototyping",
          "Connecting Multiple Tables",
          "Field Parameters & Formatting"
        ]
      },
      {
        "id": "art-pbi-mslearn",
        "type": "Article",
        "icon": "file-text",
        "title": "DAX Context Transition: Row Context vs Filter Context in Power BI",
        "provider": "Microsoft Learn",
        "domain": "learn.microsoft.com",
        "difficulty": "Intermediate",
        "duration": "9 min read",
        "views": "540K reads on Google",
        "viewCount": 540000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://learn.microsoft.com/en-us/dax/dax-overview",
        "googleSearchUrl": "https://www.google.com/search?q=DAX+Context+Transition+Microsoft+Learn",
        "description": "Ranked #1 on Google for Power BI DAX. Master CALCULATE(), filter context modification, and star schema modeling.",
        "takeaways": [
          "Row Context exists automatically in calculated columns and iterates row-by-row",
          "Filter Context is created by report slicers, visual coordinates, and page filters",
          "CALCULATE() is the only DAX function capable of creating and modifying filter context",
          "Context Transition occurs when CALCULATE() transforms an active row context into an equivalent filter context"
        ],
        "fullContent": {
          "intro": "DAX (Data Analysis Expressions) powers Power BI tabular models. Over 90% of subtle calculation errors in dashboards stem from confusing Row Context with Filter Context. This guide explains how CALCULATE() controls the engine.",
          "sections": [
            {
              "heading": "1. The Anatomy of CALCULATE()",
              "text": "CALCULATE(Expression, Filter1, Filter2, ...)\n\nExample:\nTotal High Value Sales =\nCALCULATE(\n    [Total Sales],\n    DimCustomer[Region] = 'North',\n    FactSales[Amount] > 1000\n)"
            }
          ]
        }
      },
      {
        "id": "asgn-pbi-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Executive Revenue KPI & Year-over-Year Growth Dashboard",
        "provider": "Enterprise Power BI Case Study",
        "difficulty": "Intermediate",
        "duration": "35 mins",
        "views": "14K solves",
        "viewCount": 14000,
        "progress": 0,
        "description": "Model a sales dataset, create time-intelligence DAX measures (YTD Sales, YoY % Growth), and design a high-density executive view.",
        "scenario": "The CFO requests a single-page Power BI dashboard displaying Year-to-Date revenue, Prior Year comparison, and product category contribution margin.",
        "starterDataset": {
          "tables": [
            "FactSales: [SaleID, DateKey, CustomerKey, ProductKey, Revenue, Cost]",
            "DimDate: [DateKey, FullDate, Year, Quarter, MonthName, MonthNum]"
          ],
          "sampleRows": "101 | 20250115 | C50 | P10 | $1,250 | $750"
        },
        "tasks": [
          "Relate FactSales to DimDate on DateKey (1-to-many)",
          "Mark DimDate as the official Date Table",
          "Write base measure [Total Revenue] = SUM(FactSales[Revenue])",
          "Write time-intelligence measure [Revenue YoY Growth %] using SAMEPERIODLASTYEAR()",
          "Configure Row-Level Security (RLS) restricting regional managers to their territories"
        ],
        "hints": [
          "[Revenue PY] = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[FullDate]))",
          "[YoY Growth %] = DIVIDE([Total Revenue] - [Revenue PY], [Revenue PY])"
        ],
        "solution": {
          "code": "Revenue YoY % =\nVAR CurrentRev = [Total Revenue]\nVAR PriorRev = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('DimDate'[FullDate]))\nRETURN\nDIVIDE(CurrentRev - PriorRev, PriorRev, 0)",
          "explanation": "DIVIDE() gracefully handles division by zero when prior year sales do not exist."
        }
      },
      {
        "id": "test-pbi-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Microsoft PL-300: Power BI Data Analyst Practice Exam",
        "provider": "Microsoft PL-300 Certification Standard",
        "difficulty": "Intermediate",
        "duration": "15 mins",
        "timeLimitSeconds": 900,
        "views": "36K attempts",
        "viewCount": 36000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "Official 5-question exam testing DAX CALCULATE(), Star Schema modeling, bidirectional cross filtering, and incremental refresh.",
        "testQuestions": [
          {
            "q": "What is the recommended data modeling schema for Power BI tabular models?",
            "options": [
              "Fully normalized 3NF snowflake schema",
              "Star schema with centralized fact tables and surrounding dimension tables",
              "Single flat de-normalized 200-column table",
              "Unrelated disconnected tables"
            ],
            "answer": 1,
            "explanation": "Power BI's VertiPaq in-memory engine is optimized for Star Schemas with 1-to-many relationships between dimensions and facts.",
            "topic": "Data Modeling",
            "source": "Microsoft PL-300 Official Curriculum"
          },
          {
            "q": "Which DAX function overrides or removes active filter context on a table column?",
            "options": [
              "FILTER()",
              "ALL() / REMOVEFILTERS()",
              "RELATED()",
              "USERELATIONSHIP()"
            ],
            "answer": 1,
            "explanation": "ALL() and REMOVEFILTERS() clear existing filters on the specified table or columns when used as a filter argument inside CALCULATE().",
            "topic": "DAX Evaluation Engine",
            "source": "SQLBI DAX Guide"
          },
          {
            "q": "When should bidirectional cross-filtering relationships be used in a Power BI data model?",
            "options": [
              "On every relationship by default for maximum connectivity",
              "Sparingly, only when a dimension must be filtered by another dimension through a fact table",
              "Never, Power BI forbids bidirectional relationships",
              "Only on Date tables"
            ],
            "answer": 1,
            "explanation": "Bidirectional filtering introduces ambiguity, circular dependency risks, and severe performance penalties. Use sparingly.",
            "topic": "Relationship Optimization",
            "source": "Power BI Performance Guidance"
          },
          {
            "q": "What is the purpose of the USERELATIONSHIP() function in DAX?",
            "options": [
              "Creates a new physical table relationship in Power Query",
              "Activates an inactive relationship for the duration of a specific CALCULATE expression",
              "Deletes duplicate records in customer dimension",
              "Translates user credentials into row-level security roles"
            ],
            "answer": 1,
            "explanation": "When multiple relationships exist between tables (e.g., Order Date vs Shipping Date), USERELATIONSHIP activates the inactive one.",
            "topic": "Role-Playing Dimensions",
            "source": "Microsoft Learn Power BI"
          },
          {
            "q": "What storage mode in Power BI combines in-memory VertiPaq caching for aggregated visuals with DirectQuery for real-time transactional drill-downs?",
            "options": [
              "Import Mode",
              "DirectQuery Mode",
              "Composite / Dual Mode",
              "Live Connection"
            ],
            "answer": 2,
            "explanation": "Composite models support Dual storage mode, caching dimension tables while querying facts via DirectQuery when needed.",
            "topic": "Dataset Storage Modes",
            "source": "Enterprise BI Architecture"
          }
        ]
      }
    ]
  },
  "machine-learning": {
    "title": "Machine Learning & AI Foundations",
    "why": "Machine Learning enables you to build predictive models and analyze complex patterns beyond traditional reporting.",
    "outcome": "Train regression, classification, and clustering models using Python scikit-learn.",
    "featuredYoutubeId": "7eh4d6sabA0",
    "items": [
      {
        "id": "ml-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Python Machine Learning Tutorial (Data Science)",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "1 hr 00 min",
        "views": "5.2M views",
        "viewCount": 5200000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "7eh4d6sabA0",
        "thumbnail": "https://img.youtube.com/vi/7eh4d6sabA0/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=7eh4d6sabA0",
        "description": "Mosh Hamedani introduces machine learning concepts, preparing datasets, training a decision tree model with scikit-learn, and evaluating accuracy.",
        "lessons": [
          "What is Machine Learning?",
          "Preparing & Splitting Data",
          "Training Decision Tree Models",
          "Model Persistence & Predictions"
        ]
      },
      {
        "id": "ml-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Machine Learning for Everybody – Full Course",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "3 hrs 50 min",
        "views": "4.8M views",
        "viewCount": 4800000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "i_LwzRVP7bg",
        "thumbnail": "https://img.youtube.com/vi/i_LwzRVP7bg/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=i_LwzRVP7bg",
        "description": "Taught by Kylie Ying, this course covers supervised learning, unsupervised learning, linear regression, logistic regression, and neural networks.",
        "lessons": [
          "Supervised vs Unsupervised",
          "Linear Regression Math",
          "Logistic Regression & Classification",
          "Evaluation Metrics (Precision/Recall)"
        ]
      },
      {
        "id": "ml-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "A Gentle Introduction to Machine Learning",
        "provider": "StatQuest with Josh Starmer",
        "difficulty": "Beginner",
        "duration": "12 min",
        "views": "3.4M views",
        "viewCount": 3400000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "Gv9_4yMHFhI",
        "thumbnail": "https://img.youtube.com/vi/Gv9_4yMHFhI/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
        "description": "Josh Starmer explains training data, testing data, cross-validation, and bias-variance tradeoff using simple visual analogies.",
        "lessons": [
          "Training vs Testing Sets",
          "Cross-Validation Concepts",
          "Bias and Variance Tradeoff"
        ]
      },
      {
        "id": "art-ml-gfg",
        "type": "Article",
        "icon": "file-text",
        "title": "Supervised vs Unsupervised Learning: Real-World Algorithms & Tradeoffs",
        "provider": "GeeksforGeeks",
        "domain": "geeksforgeeks.org",
        "difficulty": "Intermediate",
        "duration": "10 min read",
        "views": "1.1M reads on Google",
        "viewCount": 1100000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.geeksforgeeks.org/machine-learning/",
        "googleSearchUrl": "https://www.google.com/search?q=Machine+Learning+GeeksforGeeks+Supervised+vs+Unsupervised",
        "description": "Ranked #1 on Google. Evaluates regression, classification, clustering, bias-variance tradeoff, and ROC-AUC metrics.",
        "takeaways": [
          "Supervised learning trains on labeled data (X -> Y); unsupervised finds hidden patterns in unlabeled data (X)",
          "Classification models predict discrete class labels; regression models predict continuous numeric values",
          "Overfitting occurs when a model learns noise in training data; mitigate via regularization (L1/L2) and cross-validation",
          "ROC-AUC evaluates classification performance across all possible classification thresholds independent of class balance"
        ],
        "fullContent": {
          "intro": "Machine learning powers recommendation feeds, fraud detection engines, and generative AI. Understanding the taxonomic breakdown between supervised, unsupervised, and reinforcement learning is the primary prerequisite for enterprise modeling.",
          "sections": [
            {
              "heading": "1. The Bias-Variance Tradeoff",
              "text": "High Bias (Underfitting): The model is too simple to capture the underlying pattern (e.g. linear model on quadratic data).\nHigh Variance (Overfitting): The model memorizes training samples and fails to generalize to test data (e.g. unpruned deep decision tree)."
            }
          ]
        }
      },
      {
        "id": "asgn-ml-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Credit Card Fraud Classifier Pipeline & ROC-AUC Tuning",
        "provider": "Kaggle Benchmark Challenge",
        "difficulty": "Intermediate",
        "duration": "40 mins",
        "views": "19K solves",
        "viewCount": 19000,
        "progress": 0,
        "description": "Build a cross-validated scikit-learn Pipeline with SMOTE class balance, RandomForestClassifier, and ROC-AUC scoring.",
        "scenario": "You are tasked with training a fraud detection model on a heavily skewed credit card transaction dataset (0.17% fraud rate). Minimize false negatives while keeping false alarms acceptable.",
        "starterDataset": {
          "tables": [
            "transactions: [Time, V1..V28 (PCA components), Amount, Class (0/1)]"
          ],
          "sampleRows": "0.0 | -1.359 | -0.072 | ... | 149.62 | 0\n1.0 |  1.191 |  0.266 | ... |   2.69 | 0"
        },
        "tasks": [
          "Split data using StratifiedKFold (5 splits) to preserve class balance",
          "Wrap StandardScaler and RandomForestClassifier inside a Pipeline",
          "Tune hyperparameter max_depth and min_samples_split with GridSearchCV",
          "Plot the Precision-Recall curve and compute Average Precision score",
          "Select the probability threshold that maximizes F2-score"
        ],
        "hints": [
          "from sklearn.pipeline import Pipeline",
          "scoring='roc_auc' in cross_val_score avoids misleading accuracy"
        ],
        "solution": {
          "code": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score, StratifiedKFold\n\npipeline = Pipeline([\n    ('scaler', StandardScaler()),\n    ('rf', RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42))\n])\n\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(pipeline, X, y, cv=cv, scoring='roc_auc')\nprint(f'Mean ROC-AUC: {scores.mean():.4f}')",
          "explanation": "class_weight='balanced' automatically penalizes errors in the minority fraud class inversely proportional to frequency."
        }
      },
      {
        "id": "test-ml-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Scikit-Learn & ML Foundations Certification Diagnostic",
        "provider": "Google & Scikit-Learn Certification Suite",
        "difficulty": "Intermediate",
        "duration": "15 mins",
        "timeLimitSeconds": 900,
        "views": "29K attempts",
        "viewCount": 29000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on precision vs recall, cross-validation, regularization, and confusion matrix interpretation.",
        "testQuestions": [
          {
            "q": "In an imbalanced fraud detection model where 99.8% of transactions are legitimate and 0.2% are fraudulent, why is simple accuracy a terrible metric?",
            "options": [
              "Accuracy requires too much compute to calculate",
              "A dummy model predicting 'Legitimate' for every transaction achieves 99.8% accuracy while catching zero fraud",
              "Accuracy cannot be calculated on binary classifications",
              "Accuracy only applies to neural networks"
            ],
            "answer": 1,
            "explanation": "In severe class imbalance, accuracy is dominated by the majority class. Precision, Recall, and PR-AUC are far more informative.",
            "topic": "Model Evaluation",
            "source": "Google Machine Learning Crash Course"
          },
          {
            "q": "Which regularization technique adds the absolute magnitude of coefficients as a penalty term to the loss function, encouraging sparse feature weights (feature selection)?",
            "options": [
              "L2 Regularization (Ridge)",
              "L1 Regularization (Lasso)",
              "Dropout",
              "Batch Normalization"
            ],
            "answer": 1,
            "explanation": "L1 Lasso regularization drives non-informative feature weights strictly to zero, effectively acting as an automated feature selector.",
            "topic": "Regularization",
            "source": "Elements of Statistical Learning"
          },
          {
            "q": "What is data leakage in machine learning preprocessing pipelines?",
            "options": [
              "When an attacker steals the dataset via SQL injection",
              "When information from the test dataset is inadvertently shared with the model during training or feature scaling",
              "When a column contains missing null values",
              "When features have different physical units"
            ],
            "answer": 1,
            "explanation": "Fitting scalers (e.g. StandardScaler.fit) on the entire dataset before train-test split leaks test distribution statistics into training.",
            "topic": "Pipeline Integrity",
            "source": "Scikit-Learn Documentation"
          },
          {
            "q": "Which algorithm constructs an ensemble of decorrelated decision trees using bootstrap aggregating (bagging) and random feature subsets?",
            "options": [
              "Gradient Boosting (XGBoost)",
              "Random Forest",
              "K-Nearest Neighbors",
              "Support Vector Machine"
            ],
            "answer": 1,
            "explanation": "Random Forest builds multiple trees on bootstrapped data samples and splits nodes using random feature subsets to lower variance.",
            "topic": "Ensemble Methods",
            "source": "Breiman (2001) Random Forests"
          },
          {
            "q": "What metric measures the fraction of actual positive cases that the model correctly identified: TP / (TP + FN)?",
            "options": [
              "Precision",
              "Recall (Sensitivity)",
              "Specificity",
              "Accuracy"
            ],
            "answer": 1,
            "explanation": "Recall measures coverage of true positives: out of all sick patients, what percentage did we diagnose?",
            "topic": "Classification Metrics",
            "source": "Coursera Machine Learning Specialization"
          }
        ]
      }
    ]
  },
  "git": {
    "title": "Git & GitHub Version Control",
    "why": "Every engineering and data team relies on Git for version tracking, code review, and collaborative teamwork.",
    "outcome": "Master git branches, commits, merges, and collaborate seamlessly on GitHub.",
    "featuredYoutubeId": "8JJ101D3knE",
    "items": [
      {
        "id": "git-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Git Tutorial for Beginners: Learn Git in 1 Hour",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "1 hr 08 min",
        "views": "7.6M views",
        "viewCount": 7600000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "8JJ101D3knE",
        "thumbnail": "https://img.youtube.com/vi/8JJ101D3knE/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=8JJ101D3knE",
        "description": "The most popular Git video on YouTube with 7.6M views. Mosh Hamedani teaches Git architecture, staging, committing, branching, and merging.",
        "lessons": [
          "Repository Initialization",
          "Staging Area vs Working Directory",
          "Creating & Switching Branches",
          "Resolving Merge Conflicts"
        ]
      },
      {
        "id": "git-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Git and GitHub for Beginners - Crash Course",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "1 hr 08 min",
        "views": "5.8M views",
        "viewCount": 5800000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "RGOj5yH7evk",
        "thumbnail": "https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=RGOj5yH7evk",
        "description": "Gwen Faraday teaches local Git commands, remotes, GitHub repositories, pushing, pulling, and creating Pull Requests.",
        "lessons": [
          "Local vs Remote Repositories",
          "Pushing to GitHub",
          "Forking & Pull Requests",
          "GitHub Markdown & Readmes"
        ]
      },
      {
        "id": "git-3",
        "type": "Video",
        "icon": "play-circle",
        "title": "Complete Git and GitHub Tutorial",
        "provider": "Kevin Stratvert",
        "difficulty": "Beginner",
        "duration": "32 min",
        "views": "2.9M views",
        "viewCount": 2900000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "apGV9Kg7ics",
        "thumbnail": "https://img.youtube.com/vi/apGV9Kg7ics/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=apGV9Kg7ics",
        "description": "Kevin Stratvert explains Git from scratch with VS Code integration, visual diffs, and GitHub web interface.",
        "lessons": [
          "VS Code Source Control UI",
          "Commit Messages & History",
          "Git Clone & Push"
        ]
      },
      {
        "id": "art-git-atlassian",
        "type": "Article",
        "icon": "file-text",
        "title": "Git Rebase vs. Git Merge: The Golden Rules of Clean History",
        "provider": "Atlassian Git Guides",
        "domain": "atlassian.com",
        "difficulty": "Intermediate",
        "duration": "8 min read",
        "views": "950K reads on Google",
        "viewCount": 950000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.atlassian.com/git/tutorials/merging-vs-rebasing",
        "googleSearchUrl": "https://www.google.com/search?q=Git+Rebase+vs+Merge+Atlassian",
        "description": "Google's #1 ranked guide on Git branch management. Learn interactive rebasing, merge commits, and golden rules for shared branches.",
        "takeaways": [
          "Git Merge preserves complete commit history and chronological context with a dedicated merge commit",
          "Git Rebase moves the base of your branch forward, creating a perfectly linear, easy-to-read commit log",
          "THE GOLDEN RULE OF REBASING: Never rebase commits that have been pushed to a public/shared branch",
          "Use 'git rebase -i HEAD~N' to squash messy WIP commits into clean logical units before opening a Pull Request"
        ],
        "fullContent": {
          "intro": "Both git merge and git rebase solve the same problem: integrating changes from one branch into another. However, they accomplish this in fundamentally different ways that affect your team's code review ergonomics and git log legibility.",
          "sections": [
            {
              "heading": "1. Merging: Safe and Non-Destructive",
              "text": "When you run 'git merge feature', Git ties together the histories of both branches by generating a new 'merge commit'. The existing branches are not changed in any way."
            },
            {
              "heading": "2. Rebasing: Clean and Linear",
              "text": "Rebasing re-writes the project history by creating brand new commits for each commit in the feature branch on top of main. The result is a straight line of commits without noisy merge bubbles."
            }
          ]
        }
      },
      {
        "id": "asgn-git-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Multi-Developer Feature Branch & Merge Conflict Simulation",
        "provider": "DevOps & Collaborative Git Challenge",
        "difficulty": "Intermediate",
        "duration": "25 mins",
        "views": "17K solves",
        "viewCount": 17000,
        "progress": 0,
        "description": "Simulate a collaborative repository conflict: create conflicting branches, perform a 3-way merge, and squash commits.",
        "scenario": "Developer A and Developer B edited the same configuration block in server.js on separate branches. Reconcile both changes and push a clean single commit to main.",
        "starterDataset": {
          "tables": [
            "Branches: main (v1.0.0), feature/auth (Dev A), feature/payment (Dev B)"
          ],
          "sampleRows": "server.js lines 42-48 edited concurrently by both developers"
        },
        "tasks": [
          "Check out feature/payment and rebase on top of main",
          "Identify and resolve <<<<<<< HEAD conflicts in server.js",
          "Run 'git rebase --continue' after staging resolved files",
          "Use interactive rebase 'git rebase -i HEAD~3' to squash 3 experimental commits into one descriptive commit",
          "Verify linear history using 'git log --oneline --graph'"
        ],
        "hints": [
          "Remove conflict markers (<<<<<<<, =======, >>>>>>>) cleanly",
          "Replace 'pick' with 'squash' or 's' for intermediate commits in the rebase todo list"
        ],
        "solution": {
          "code": "# Step 1: Rebase feature onto updated main\ngit checkout feature/payment\ngit rebase main\n\n# Step 2: Edit server.js to merge both ports/endpoints, then:\ngit add server.js\ngit rebase --continue\n\n# Step 3: Squash commits\ngit rebase -i HEAD~3\n# (change commits 2 and 3 to 'squash')\ngit log --oneline --graph",
          "explanation": "Rebasing with interactive squashing keeps team commit history clean and bisect-friendly."
        }
      },
      {
        "id": "test-git-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "Git & GitHub Professional Version Control Assessment",
        "provider": "GitHub Certified Developer Standard",
        "difficulty": "Intermediate",
        "duration": "10 mins",
        "timeLimitSeconds": 600,
        "views": "34K attempts",
        "viewCount": 34000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on merge conflict resolution, detached HEAD, cherry-pick, and git reset modes.",
        "testQuestions": [
          {
            "q": "What does the 'Golden Rule of Rebasing' state?",
            "options": [
              "Always rebase on Fridays",
              "Never rebase commits that have been pushed to a shared/public branch",
              "Only rebase branches with fewer than 3 commits",
              "Rebase requires deleting the remote origin"
            ],
            "answer": 1,
            "explanation": "Rebasing rewrites commit SHA hashes. If teammates have pulled those commits, their local histories will diverge, causing chaotic merge conflicts.",
            "topic": "Rebasing Best Practices",
            "source": "Pro Git by Scott Chacon"
          },
          {
            "q": "Which command undoes the last commit but keeps all changes staged in the index ready to be re-committed?",
            "options": [
              "git reset --hard HEAD~1",
              "git reset --soft HEAD~1",
              "git revert HEAD",
              "git clean -fd"
            ],
            "answer": 1,
            "explanation": "--soft moves the HEAD pointer back without altering the staging index or working directory.",
            "topic": "Undo Operations",
            "source": "GitHub Documentation"
          },
          {
            "q": "What does 'git cherry-pick <commit-hash>' do?",
            "options": [
              "Deletes the commit from branch history",
              "Applies the changes introduced by a specific existing commit onto your currently checked-out branch",
              "Merges two branches without conflicts",
              "Tags the commit for release"
            ],
            "answer": 1,
            "explanation": "Cherry-pick selects a single commit from any branch and reapplies its diff onto the current HEAD.",
            "topic": "Selective Commit Application",
            "source": "Atlassian Git Tutorials"
          },
          {
            "q": "What state is Git in when you check out a specific commit hash rather than a branch name: 'git checkout a1b2c3d'?",
            "options": [
              "Stash mode",
              "Detached HEAD state",
              "Rebase conflict mode",
              "Remote lock mode"
            ],
            "answer": 1,
            "explanation": "In detached HEAD state, HEAD points directly to a commit rather than a named branch reference.",
            "topic": "Git Internals",
            "source": "Git SCM Reference Manual"
          },
          {
            "q": "How do you temporarily shelf unstaged modifications so you can switch branches to fix a production bug?",
            "options": [
              "git branch --save",
              "git stash (or git stash push)",
              "git commit -m 'temp' --force",
              "git reset"
            ],
            "answer": 1,
            "explanation": "git stash takes modified tracked files and saves them on a stack of incomplete changes without creating commits.",
            "topic": "Work-in-Progress Management",
            "source": "HackerRank Git Essentials"
          }
        ]
      }
    ]
  },
  "c": {
    "title": "C Programming Language & Systems",
    "why": "C provides foundational knowledge of memory management, pointers, and CPU-efficient computer architecture.",
    "outcome": "Understand pointers, memory allocation, and data structures in low-level programming.",
    "featuredYoutubeId": "KJgsSFOSQv0",
    "items": [
      {
        "id": "c-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "C Programming Tutorial for Beginners",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "3 hrs 46 min",
        "views": "16M views",
        "viewCount": 16000000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "KJgsSFOSQv0",
        "thumbnail": "https://img.youtube.com/vi/KJgsSFOSQv0/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=KJgsSFOSQv0",
        "description": "Over 16 million views. Mike Dane guides you through C syntax, variables, data types, pointers, memory addresses, and file I/O.",
        "lessons": [
          "C Variables & Data Types",
          "Arrays & 2D Arrays",
          "Memory Addresses & Pointers",
          "Writing & Reading Files"
        ]
      },
      {
        "id": "c-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "C Language Tutorial for Beginners (with Notes)",
        "provider": "Programming with Mosh",
        "difficulty": "Beginner",
        "duration": "2 hrs 30 min",
        "views": "3.2M views",
        "viewCount": 3200000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "irqbmMNs2Bo",
        "thumbnail": "https://img.youtube.com/vi/irqbmMNs2Bo/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=irqbmMNs2Bo",
        "description": "Comprehensive C programming course with clear explanations of compilation, memory layouts, structures, and dynamic allocation.",
        "lessons": [
          "Compiler Setup & Main Function",
          "Functions & Header Files",
          "Structs & Typedef",
          "Dynamic Memory (malloc/free)"
        ]
      },
      {
        "id": "art-c-gfg",
        "type": "Article",
        "icon": "file-text",
        "title": "Pointers and Dynamic Memory Allocation in C: Stack vs. Heap",
        "provider": "GeeksforGeeks",
        "domain": "geeksforgeeks.org",
        "difficulty": "Intermediate",
        "duration": "9 min read",
        "views": "1.3M reads on Google",
        "viewCount": 1300000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://www.geeksforgeeks.org/c-programming-language/",
        "googleSearchUrl": "https://www.google.com/search?q=C+Pointers+GeeksforGeeks",
        "description": "Ranked #1 on Google for C programming. Address-of (&), dereferencing (*), malloc/free, and memory leak prevention.",
        "takeaways": [
          "A pointer variable stores the hexadecimal memory address of another variable",
          "The '&' operator retrieves the memory address; '*' dereferences the pointer to access the underlying value",
          "Stack memory is auto-allocated and freed per stack frame; heap memory requires explicit malloc() and free()",
          "Always set pointers to NULL after freeing to eliminate dangerous dangling pointer vulnerabilities"
        ],
        "fullContent": {
          "intro": "In systems programming and embedded engineering, direct memory control is essential. C gives developers direct access to computer RAM through pointers, allowing high-speed buffer manipulation and dynamic heap allocation.",
          "sections": [
            {
              "heading": "1. Pointer Declaration and Dereferencing",
              "text": "int x = 42;\nint *ptr = &x; // ptr holds address of x\nprintf(\"%d\\n\", *ptr); // outputs 42\n*ptr = 100; // x is now 100!"
            },
            {
              "heading": "2. Safe Dynamic Memory Management",
              "text": "int *arr = (int *)malloc(5 * sizeof(int));\nif (arr == NULL) {\n    fprintf(stderr, \"Out of memory!\\n\");\n    return 1;\n}\n// Always free allocated heap blocks:\nfree(arr);\narr = NULL; // Prevent dangling pointer bug"
            }
          ]
        }
      },
      {
        "id": "asgn-c-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Dynamic Resizable Array (Vector) Implementation in C",
        "provider": "Systems Software Challenge",
        "difficulty": "Intermediate",
        "duration": "35 mins",
        "views": "14K solves",
        "viewCount": 14000,
        "progress": 0,
        "description": "Implement a dynamically resizing integer array with push_back, pop, realloc growth, and memory cleanup.",
        "scenario": "You are building an embedded data logger where record counts cannot be known ahead of time. Build a lightweight dynamic array structure in C.",
        "starterDataset": {
          "tables": [
            "struct Vector { int *data; size_t size; size_t capacity; };"
          ],
          "sampleRows": "Initial: capacity=4, size=0 -> Grow to capacity=8 when size reaches capacity"
        },
        "tasks": [
          "Define Vector struct with pointer, size, and capacity",
          "Implement vector_init(Vector *v, size_t initial_cap)",
          "Implement vector_push(Vector *v, int value) using realloc() when full",
          "Implement vector_free(Vector *v) releasing heap memory and resetting pointers",
          "Verify zero memory leaks using Valgrind or compiler ASan (-fsanitize=address)"
        ],
        "hints": [
          "Double capacity when size == capacity: new_cap = v->capacity * 2",
          "Check realloc return value before overwriting v->data to prevent leak on failure"
        ],
        "solution": {
          "code": "#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    size_t size;\n    size_t capacity;\n} Vector;\n\nvoid vector_init(Vector *v, size_t cap) {\n    v->size = 0;\n    v->capacity = cap > 0 ? cap : 4;\n    v->data = (int *)malloc(v->capacity * sizeof(int));\n}\n\nvoid vector_push(Vector *v, int val) {\n    if (v->size >= v->capacity) {\n        v->capacity *= 2;\n        v->data = (int *)realloc(v->data, v->capacity * sizeof(int));\n    }\n    v->data[v->size++] = val;\n}\n\nvoid vector_free(Vector *v) {\n    free(v->data);\n    v->data = NULL;\n    v->size = v->capacity = 0;\n}",
          "explanation": "Doubling capacity gives amortized O(1) push operations while realloc optimizes in-place memory extension."
        }
      },
      {
        "id": "test-c-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "C Language Architecture & Memory Diagnostics Test",
        "provider": "ANSI C Standards Benchmark",
        "difficulty": "Intermediate",
        "duration": "12 mins",
        "timeLimitSeconds": 720,
        "views": "27K attempts",
        "viewCount": 27000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on pointer arithmetic, sizeof evaluation, struct alignment, and buffer overflows.",
        "testQuestions": [
          {
            "q": "What does the expression *(arr + i) evaluate to in standard C?",
            "options": [
              "The address of array index i",
              "arr[i] (Dereferencing the element at offset i)",
              "A syntax error in modern compilers",
              "The size of the array multiplied by i"
            ],
            "answer": 1,
            "explanation": "In C, array subscript notation arr[i] is syntactically identical to pointer arithmetic *(arr + i).",
            "topic": "Array-Pointer Duality",
            "source": "The C Programming Language (K&R)"
          },
          {
            "q": "What is the consequence of failing to call free() on memory allocated with malloc() before losing the pointer variable?",
            "options": [
              "Segmentation Fault immediately",
              "Memory Leak (RAM remains allocated until process termination)",
              "Automatic garbage collection by the OS",
              "Compilation warning"
            ],
            "answer": 1,
            "explanation": "C has no automated garbage collection. Unfreed heap allocations persist until process exit, causing memory leaks.",
            "topic": "Memory Management",
            "source": "CERT C Secure Coding Standard"
          },
          {
            "q": "On a 64-bit architecture, what is the value of sizeof(char *) and sizeof(int *)?",
            "options": [
              "1 byte and 4 bytes",
              "8 bytes and 8 bytes (all pointers are 64 bits)",
              "4 bytes and 8 bytes",
              "Depends on the size of the array"
            ],
            "answer": 1,
            "explanation": "On a 64-bit platform, all memory addresses occupy 8 bytes (64 bits), regardless of the pointed-to type.",
            "topic": "Platform Architecture",
            "source": "ANSI C99 Standard"
          },
          {
            "q": "What is undefined behavior in C?",
            "options": [
              "Code that generates a compiler syntax error",
              "Code for which the C specification imposes no requirements; anything can happen including crashes or silent corruption",
              "Functions with missing return types",
              "Variables declared without static"
            ],
            "answer": 1,
            "explanation": "Undefined behavior (e.g. out-of-bounds array access, null pointer dereference) allows compilers to make arbitrary optimizations with unpredictable results.",
            "topic": "Undefined Behavior",
            "source": "ISO/IEC 9899 Specification"
          },
          {
            "q": "Which function safely copies at most N bytes into a destination buffer, preventing buffer overflow vulnerabilities?",
            "options": [
              "strcpy()",
              "strncpy() / snprintf()",
              "gets()",
              "strcat()"
            ],
            "answer": 1,
            "explanation": "strncpy() and snprintf() take explicit buffer length limits, unlike deprecated strcpy() and gets().",
            "topic": "Secure Coding",
            "source": "OWASP C/C++ Security Guidelines"
          }
        ]
      }
    ]
  },
  "figma": {
    "title": "UI/UX Design & Prototyping",
    "why": "Design thinking and prototyping skills help you translate user requirements into intuitive software interfaces.",
    "outcome": "Create wireframes, component design systems, and clickable prototypes in Figma.",
    "featuredYoutubeId": "c9Wg6Cb_YlU",
    "items": [
      {
        "id": "fig-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "UI / UX Design Tutorial – Wireframe, Mockup & Prototype in Figma",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "3 hrs 55 min",
        "views": "3.8M views",
        "viewCount": 3800000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "c9Wg6Cb_YlU",
        "thumbnail": "https://img.youtube.com/vi/c9Wg6Cb_YlU/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
        "description": "Daniel Walter Scott from Bring Your Own Laptop teaches UX workflow, wireframing, typography, auto-layout, and interactive prototypes.",
        "lessons": [
          "UX Research & Personas",
          "Figma Auto-Layout & Constraints",
          "Component Sets & Variants",
          "Clickable Interactive Prototypes"
        ]
      },
      {
        "id": "fig-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Figma Tutorial for UI Design - Course for Beginners",
        "provider": "Mizko",
        "difficulty": "Beginner",
        "duration": "1 hr 30 min",
        "views": "2.1M views",
        "viewCount": 2100000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "jwCmIBJ8Jtc",
        "thumbnail": "https://img.youtube.com/vi/jwCmIBJ8Jtc/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=jwCmIBJ8Jtc",
        "description": "Mizko teaches production-ready Figma techniques, responsive design grids, design systems, and developer handoff.",
        "lessons": [
          "Design Grids & Spacing",
          "Color Styles & Typography",
          "Auto-layout Mastery",
          "Design System Setup"
        ]
      },
      {
        "id": "art-fig-community",
        "type": "Article",
        "icon": "file-text",
        "title": "The 8pt Grid System & Typography Scale Hierarchy in Figma",
        "provider": "Figma Community Guide",
        "domain": "help.figma.com",
        "difficulty": "Beginner",
        "duration": "7 min read",
        "views": "680K reads on Google",
        "viewCount": 680000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://help.figma.com/hc/en-us/articles/360040451373-Create-layouts-with-auto-layout",
        "googleSearchUrl": "https://www.google.com/search?q=Figma+8pt+Grid+System+Auto+Layout+Guide",
        "description": "Google top result for UI systems. Learn pixel-perfection with 8pt spacing tokens, modular type scales, and responsive auto-layout.",
        "takeaways": [
          "Use multiples of 8 (8, 16, 24, 32, 48, 64) for padding, margins, and component dimensions",
          "Use a 4pt baseline subgrid for fine typography line-heights and tight badge spacing",
          "Auto Layout with 'Fill Container' and 'Hug Contents' mirrors modern CSS flexbox behavior",
          "Color tokens should be named semantically (e.g. 'surface-brand', 'text-subtle') rather than by raw hex"
        ],
        "fullContent": {
          "intro": "Design systems bridge the gap between creative UI design and frontend engineering. Standardizing on an 8pt spatial grid ensures visual harmony, eliminates arbitrary designer guesswork, and maps 1:1 to Tailwind spacing tokens.",
          "sections": [
            {
              "heading": "1. Why the 8pt Grid Works",
              "text": "Almost all modern display viewports (phones, tablets, 1080p, 4K displays) have screen resolutions divisible by 8. Designing on an 8pt grid prevents blurry half-pixel rendering artifacts when graphics are scaled."
            }
          ]
        }
      },
      {
        "id": "asgn-fig-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Responsive SaaS Dashboard Navigation & Metric Card System",
        "provider": "Product Design System Challenge",
        "difficulty": "Intermediate",
        "duration": "30 mins",
        "views": "11K solves",
        "viewCount": 11000,
        "progress": 0,
        "description": "Design a responsive KPI metric card component with status badges, sparkline trendline, and Auto Layout variants.",
        "scenario": "The design team is standardizing the analytics product UI. Build a reusable KPI Card component with states for Positive (+12%), Negative (-4%), and Neutral trends.",
        "starterDataset": {
          "tables": [
            "Specs: Width: 280-340px (Fill), 16px Padding, 8px Radius, 1px Border"
          ],
          "sampleRows": "Metric: $84,230 | Trend: +14.2% vs last month | Title: Monthly Recurring Revenue"
        },
        "tasks": [
          "Create base frame with 16px horizontal and vertical padding (8pt token)",
          "Add Title (13px, font-medium, subtle ink) and Value (24px, font-bold)",
          "Add trend pill badge with green/red semantic pill and directional arrow icon",
          "Convert to Component Set with 'Trend: Positive | Negative' variants",
          "Test responsive behavior using Auto Layout 'Fill Container' inside a 3-column grid"
        ],
        "hints": [
          "Use Shift+A to quickly add Auto Layout to selected layers",
          "Set vertical gap to 8px and horizontal elements to space-between"
        ],
        "solution": {
          "code": "Figma Hierarchy:\n[AutoLayout: Vertical | Gap 12px | Pad 16px | Radius 8px | Border 1px]\n  ├── [AutoLayout: Horizontal | Between]\n  │     ├── Text: 'MRR' (13px #64748B)\n  │     └── IconTile: 'trend-up' (28px #F1F5F9)\n  ├── Text: '$84,230' (24px Bold #0F172A)\n  └── [AutoLayout: Horizontal | Gap 6px]\n        ├── Badge: '+14.2%' (#10B981 BG: #ECFDF5)\n        └── Text: 'vs prior period' (12px #94A3B8)",
          "explanation": "Clean 8pt padding, semantic hierarchy, and flex-equivalent alignment ensure seamless handoff to engineering."
        }
      },
      {
        "id": "test-fig-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "UI/UX Design Systems & Figma Architecture Test",
        "provider": "Interaction Design Foundation (IxDF)",
        "difficulty": "Intermediate",
        "duration": "10 mins",
        "timeLimitSeconds": 600,
        "views": "24K attempts",
        "viewCount": 24000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on Auto Layout constraints, component variants, WCAG AA color contrast, and design tokens.",
        "testQuestions": [
          {
            "q": "In Figma Auto Layout, which resizing setting makes a child element stretch to take up all remaining space in its parent frame?",
            "options": [
              "Fixed Width",
              "Hug Contents",
              "Fill Container",
              "Scale"
            ],
            "answer": 2,
            "explanation": "'Fill Container' expands the child element to consume available space, identical to flex: 1 in CSS.",
            "topic": "Auto Layout Resizing",
            "source": "Figma Documentation"
          },
          {
            "q": "What is the minimum WCAG 2.1 Level AA contrast ratio required for regular body text (below 18pt)?",
            "options": [
              "3:1",
              "4.5:1",
              "7:1",
              "2:1"
            ],
            "answer": 1,
            "explanation": "WCAG AA mandates a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (>= 18pt or 14pt bold).",
            "topic": "Accessibility Standards",
            "source": "W3C Web Accessibility Guidelines"
          },
          {
            "q": "How should design tokens be structured in a scalable design system?",
            "options": [
              "Hardcode HEX values in every component instance",
              "Global Palette Tokens (Blue-500) -> Semantic Alias Tokens (Color-Primary) -> Component Scoped Tokens (Button-BG)",
              "Name colors by mood: Color-Happy, Color-Calm",
              "Use random opacity layers"
            ],
            "answer": 1,
            "explanation": "A 3-tier token hierarchy allows re-theming and dark-mode adaptation without altering core palette definitions.",
            "topic": "Design Token Architecture",
            "source": "Design Systems Handbook"
          },
          {
            "q": "What Figma feature allows grouping multiple button states (Hover, Active, Disabled, Loading) into a single cohesive asset?",
            "options": [
              "Layer Groups",
              "Component Sets & Variants",
              "Smart Animate",
              "Section Dividers"
            ],
            "answer": 1,
            "explanation": "Component Sets combine individual components into variants with configurable property toggles.",
            "topic": "Component Architecture",
            "source": "Figma Best Practices"
          },
          {
            "q": "Why is an 8pt spatial grid preferred over a 10pt grid in responsive UI design?",
            "options": [
              "8 is a lucky number in computer science",
              "8 divides evenly across standard screen resolutions (360, 375, 768, 1080, 1440, 1920) without sub-pixel rounding",
              "CSS only supports multiples of 8",
              "It makes buttons larger"
            ],
            "answer": 1,
            "explanation": "Standard screen widths divide cleanly by 8 and 4, preventing blurry half-pixel rendering.",
            "topic": "Spatial Grid Systems",
            "source": "Material Design Guidelines"
          }
        ]
      }
    ]
  },
  "web-development": {
    "title": "Modern Web Development (HTML, CSS & React)",
    "why": "Frontend web skills enable you to build dashboards, web applications, and interactive user interfaces.",
    "outcome": "Build responsive user interfaces from scratch using HTML5, modern CSS, and React components.",
    "featuredYoutubeId": "mU6anWqZJcc",
    "items": [
      {
        "id": "web-1",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "Learn HTML5 and CSS3 From Scratch - Full Course",
        "provider": "freeCodeCamp.org",
        "difficulty": "Beginner",
        "duration": "11 hrs 30 min",
        "views": "8.5M views",
        "viewCount": 8500000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "mU6anWqZJcc",
        "thumbnail": "https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=mU6anWqZJcc",
        "description": "Over 8.5 million views. Complete introduction to semantic HTML, modern CSS flexbox, grid, animations, and responsive mobile layouts.",
        "lessons": [
          "Semantic HTML Elements",
          "CSS Box Model & Flexbox",
          "CSS Grid Layouts",
          "Responsive Media Queries"
        ]
      },
      {
        "id": "web-2",
        "type": "Course",
        "icon": "graduation-cap",
        "title": "React Course - Beginner's Tutorial for React",
        "provider": "Dave Gray",
        "difficulty": "Intermediate",
        "duration": "8 hrs 20 min",
        "views": "4.2M views",
        "viewCount": 4200000,
        "isFamous": true,
        "progress": 0,
        "youtubeId": "bMknfKXIFA8",
        "thumbnail": "https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=bMknfKXIFA8",
        "description": "Dave Gray teaches modern React: components, JSX, props, state with useState, useEffect hooks, and building full SPA projects.",
        "lessons": [
          "JSX & Component Architecture",
          "State & Props",
          "Hooks (useState, useEffect, useRef)",
          "Routing & API Fetching"
        ]
      },
      {
        "id": "art-web-mdn",
        "type": "Article",
        "icon": "file-text",
        "title": "Modern CSS Layouts: Flexbox vs. CSS Grid Deep Dive",
        "provider": "MDN Web Docs",
        "domain": "developer.mozilla.org",
        "difficulty": "Intermediate",
        "duration": "10 min read",
        "views": "1.8M reads on Google",
        "viewCount": 1800000,
        "isGoogleVerified": true,
        "progress": 0,
        "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox",
        "googleSearchUrl": "https://www.google.com/search?q=CSS+Flexbox+MDN+Web+Docs",
        "description": "Ranked #1 on Google for web styling. One-dimensional alignment (Flexbox) vs. two-dimensional layouts (CSS Grid).",
        "takeaways": [
          "Use Flexbox for one-dimensional layouts (a single row OR a single column) and component-level alignment",
          "Use CSS Grid for two-dimensional layouts (both rows AND columns simultaneously) and page scaffolding",
          "CSS Grid 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))' builds instant responsive cards without media queries",
          "Flexbox 'justify-content' aligns along the main axis; 'align-items' aligns along the cross axis"
        ],
        "fullContent": {
          "intro": "Modern web layout has evolved beyond float hacks and table structures. Today, CSS Flexbox and CSS Grid provide deterministic, declarative control over responsive design across any device viewport.",
          "sections": [
            {
              "heading": "1. The Deciding Rule: Flexbox or Grid?",
              "text": "• Choose Flexbox when you want content size to dictate layout in one direction (e.g. a navbar with logo on the left and buttons on the right).\n• Choose Grid when you want strict layout tracks to dictate content placement across both dimensions (e.g. an application dashboard)."
            }
          ]
        }
      },
      {
        "id": "asgn-web-1",
        "type": "Practice",
        "category": "Assignment",
        "icon": "code-2",
        "title": "Debounced Live Search & Virtual Filter Component in React",
        "provider": "Frontend Engineering Interview Task",
        "difficulty": "Intermediate",
        "duration": "30 mins",
        "views": "16K solves",
        "viewCount": 16000,
        "progress": 0,
        "description": "Build a custom useDebounce hook, wire it to an instant search input, and filter a 1,000-item product list without lag.",
        "scenario": "Users on slow connections experience input stutter when typing into an instant-filter search box. Build a debounced search interface with 300ms delay.",
        "starterDataset": {
          "tables": [
            "Products: [id, title, category, price, rating]"
          ],
          "sampleRows": "101 | Wireless Noise Cancelling Headphones | Audio | $299 | 4.8"
        },
        "tasks": [
          "Create custom hook useDebounce(value, delayMs)",
          "Bind text input to raw search term state",
          "Pass debounced term to useMemo filter filtering 1,000 items",
          "Render empty state with 'No matching items found' when results are empty",
          "Add loading indicator while debounce timer is active"
        ],
        "hints": [
          "useEffect with setTimeout and clearTimeout in the cleanup function handles debounce"
        ],
        "solution": {
          "code": "import { useState, useEffect, useMemo } from 'react';\n\nfunction useDebounce(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}\n\n// Usage in component:\nconst [query, setQuery] = useState('');\nconst debouncedQuery = useDebounce(query, 300);\nconst filtered = useMemo(() => {\n  return items.filter(it => it.title.toLowerCase().includes(debouncedQuery.toLowerCase()));\n}, [items, debouncedQuery]);",
          "explanation": "Debouncing postpones expensive array filtering until the user stops typing for 300ms, maintaining 60fps."
        }
      },
      {
        "id": "test-web-1",
        "type": "Practice",
        "category": "Test Series",
        "icon": "check-square",
        "title": "React 18 & Modern Web Architecture Certification Exam",
        "provider": "Meta Front-End Developer Standard",
        "difficulty": "Intermediate",
        "duration": "12 mins",
        "timeLimitSeconds": 720,
        "views": "44K attempts",
        "viewCount": 44000,
        "progress": 0,
        "questionsCount": 5,
        "passScore": 75,
        "description": "5 questions on React hooks lifecycle, state closure pitfalls, virtual DOM reconciliation, and performance.",
        "testQuestions": [
          {
            "q": "Why must React Hook calls (useState, useEffect) never be placed inside loops, conditions, or nested functions?",
            "options": [
              "It slows down JavaScript JIT compilation",
              "React relies on the strict call order of hooks across renders to associate internal state with each hook",
              "Hooks can only be called from class component render methods",
              "It produces a memory leak in the browser"
            ],
            "answer": 1,
            "explanation": "React tracks hook state by internal index order. Altering the order via conditionals breaks the state alignment on subsequent renders.",
            "topic": "Rules of Hooks",
            "source": "React Official Documentation"
          },
          {
            "q": "What does the cleanup function returned inside a useEffect hook do?",
            "codeSnippet": "useEffect(() => {\n  const handler = () => console.log('scroll');\n  window.addEventListener('scroll', handler);\n  return () => window.removeEventListener('scroll', handler);\n}, []);",
            "options": [
              "Fires only when the browser window closes",
              "Runs before the component unmounts and before re-running the effect on dependency change, preventing memory leaks",
              "Deletes the component from local storage",
              "Clears all React state variables"
            ],
            "answer": 1,
            "explanation": "The returned cleanup callback cleans up subscriptions, event listeners, and timers before unmounting or re-executing.",
            "topic": "Effect Lifecycle",
            "source": "Meta React Specialization"
          },
          {
            "q": "What CSS rule creates an auto-responsive card grid that automatically wraps without requiring media queries?",
            "options": [
              "display: inline-block; width: 33%",
              "display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;",
              "float: left; margin: 10px;",
              "flex-direction: row-reverse"
            ],
            "answer": 1,
            "explanation": "repeat(auto-fit, minmax(280px, 1fr)) creates as many 280px columns as can fit, expanding remaining space evenly.",
            "topic": "Modern CSS Grid",
            "source": "MDN Web Docs"
          },
          {
            "q": "Why is mutating React state directly (e.g., state.count = 5) considered an anti-pattern?",
            "options": [
              "JavaScript throws a TypeError on object mutation",
              "React uses shallow reference equality (Object.is) to detect state changes; direct mutations do not trigger re-renders",
              "State objects are stored in read-only cookies",
              "It makes the page reload"
            ],
            "answer": 1,
            "explanation": "React relies on immutable state updates. If the object reference doesn't change, React bails out of re-rendering.",
            "topic": "Immutability & Reconciliation",
            "source": "React Core Principles"
          },
          {
            "q": "Which hook should be used to cache expensive calculation results between renders: const memoized = ...?",
            "options": [
              "useCallback",
              "useMemo",
              "useRef",
              "useReducer"
            ],
            "answer": 1,
            "explanation": "useMemo caches the result of a function calculation. useCallback caches the function instance itself.",
            "topic": "Performance Optimization",
            "source": "React Performance Guide"
          }
        ]
      }
    ]
  }
};

  const projects = [
    { id:'student-performance-analytics', title:'Student Performance Analytics', difficulty:'Beginner', skills:['SQL','Excel'], duration:'1–2 weeks', recommended:true, match:94,
      overview:'Analyse semester results for 1,200 students to find what drives performance across subjects and attendance.',
      problem:'A college academic office wants to understand why pass rates vary across departments. They have exam scores, attendance and course data in separate tables — but no one has connected them.',
      outcome:'A set of SQL queries, an Excel summary and a short insight report with 5 data-backed recommendations for the academic office.',
      learn:['Design a normalised schema','Write JOINs across 4 tables','Aggregate and rank results','Present insights clearly'],
      milestones:[
        {t:'Design database', d:'Plan tables for students, courses, scores and attendance with keys.'},
        {t:'Import dataset', d:'Load the provided CSV files and validate row counts.'},
        {t:'Write SQL queries', d:'Answer 8 guided business questions using JOINs and GROUP BY.'},
        {t:'Analyse performance', d:'Find patterns between attendance, subject and outcomes.'},
        {t:'Create insights', d:'Summarise 5 recommendations in a one-page report.'},
      ],
      dataset:'students.csv · courses.csv · scores.csv · attendance.csv (1,200 rows)'},
    { id:'sales-dashboard', title:'Sales Dashboard', difficulty:'Intermediate', skills:['SQL','Power BI'], duration:'2 weeks', match:81,
      overview:'Build an interactive regional sales dashboard for a D2C retail brand with monthly targets.',
      problem:'A growing retail brand tracks sales in spreadsheets. Leadership needs one dashboard to see revenue, top products and regional performance against targets.',
      outcome:'A published Power BI dashboard backed by SQL views, with drill-downs by region and product.',
      learn:['Create SQL views for reporting','Model data in Power BI','Write basic DAX measures','Design for decision-makers'],
      milestones:[
        {t:'Explore the data', d:'Profile orders, products and regions.'},
        {t:'Build SQL views', d:'Create clean reporting views.'},
        {t:'Model in Power BI', d:'Set up relationships and measures.'},
        {t:'Design dashboard', d:'Revenue, targets and product views.'},
        {t:'Present findings', d:'Record a 3-minute walkthrough.'},
      ],
      dataset:'orders.csv · products.csv · regions.csv (18,000 rows)'},
    { id:'customer-analytics', title:'Customer Analytics', difficulty:'Intermediate', skills:['Python','SQL'], duration:'2–3 weeks', match:77,
      overview:'Segment customers of a food-delivery app by behaviour and identify who is likely to churn.',
      problem:'A food-delivery startup is losing repeat customers. They want to understand customer segments and early signs of churn.',
      outcome:'A Jupyter notebook with RFM segmentation, churn indicators and a recommendation memo.',
      learn:['Query order history with SQL','RFM segmentation in pandas','Visualise cohorts','Communicate churn risk'],
      milestones:[
        {t:'Extract data', d:'Pull order history with SQL.'},
        {t:'Clean & prepare', d:'Handle missing and duplicate records.'},
        {t:'Segment customers', d:'Build RFM scores in pandas.'},
        {t:'Analyse churn', d:'Compare retained vs churned cohorts.'},
        {t:'Write memo', d:'Share 3 retention recommendations.'},
      ],
      dataset:'customers.csv · orders.csv (42,000 rows)'},
  ];

  const completedProjects = [
    {title:'Movie Ratings Explorer', skills:['Python','pandas'], date:'Aug 2026', score:'Reviewed · 4.5/5'},
    {title:'Hostel Expense Tracker', skills:['Excel'], date:'Jun 2026', score:'Reviewed · 4/5'},
  ];

  const questions = [
    {q:'Which clause is used to filter rows after aggregation?', o:['WHERE','HAVING','ORDER BY','LIMIT'], a:1},
    {q:'What does a LEFT JOIN return?', o:['Only matching rows from both tables','All rows from the right table','All rows from the left table, with matches from the right','Only non-matching rows'], a:2},
    {q:'Which query counts the students in each department?', o:['SELECT COUNT(*) FROM students;','SELECT dept, COUNT(*) FROM students GROUP BY dept;','SELECT dept FROM students WHERE COUNT(*);','SELECT DISTINCT COUNT(dept) FROM students;'], a:1},
    {q:'You need the top 5 scores from the scores table. Which is correct?', o:['SELECT score FROM scores ORDER BY score DESC LIMIT 5;','SELECT TOP score FROM scores 5;','SELECT score FROM scores LIMIT 5 ORDER BY score;','SELECT MAX(5) FROM scores;'], a:0},
    {q:'Which keyword removes duplicate values from a result?', o:['UNIQUE','DISTINCT','DIFFERENT','SINGLE'], a:1},
    {q:'What will  SELECT AVG(marks) FROM results WHERE marks IS NOT NULL;  return?', o:['Average of all marks including NULLs as 0','Average of non-null marks','Count of non-null marks','An error'], a:1},
    {q:'A primary key must be…', o:['Unique and not null','Unique but can be null','A text column','Shared across tables'], a:0},
    {q:'Which JOIN returns only rows with matches in both tables?', o:['FULL OUTER JOIN','LEFT JOIN','INNER JOIN','CROSS JOIN'], a:2},
    {q:'What is a subquery?', o:['A query that deletes rows','A query nested inside another query','A stored backup of a table','A type of index'], a:1},
    {q:'Which function returns the number of characters in a string in most SQL dialects?', o:['SIZE()','COUNT()','LENGTH()','CHARS()'], a:2},
  ];

  const activity = [
    {icon:'check-circle-2', tone:'green', t:'Completed Python Assessment', s:'Scored 9/10 · Python validated at Advanced', when:'2 days ago'},
    {icon:'book-open-check', tone:'green', t:'Completed Excel Module', s:'Pivot Tables & Lookups', when:'4 days ago'},
    {icon:'play', tone:'blue', t:'Started SQL Fundamentals', s:'Lesson 9 of 24 · JOINs explained', when:'5 days ago'},
    {icon:'folder-kanban', tone:'amber', t:'Project recommendation received', s:'Student Performance Analytics · 94% match', when:'1 week ago'},
  ];

  const notifications = [
    {icon:'folder-kanban', tone:'amber', t:'New project matched to your goal', s:'Student Performance Analytics', when:'2h', to:'/projects/student-performance-analytics'},
    {icon:'clipboard-check', tone:'blue', t:'SQL Fundamentals Assessment is unlocked', s:'10 questions · ~15 min', when:'1d', to:'/assessment'},
    {icon:'trending-up', tone:'green', t:'Your readiness went up by 6%', s:'After completing the Excel module', when:'4d', to:'/career-readiness'},
  ];

  const institution = {
    name:'KIIT University · School of Computer Engineering',
    students:428, avgReadiness:61, avgDelta:7, activeLearners:356, validated:1184,
    gaps:[{s:'SQL',n:42},{s:'Communication',n:31},{s:'Python',n:26},{s:'Statistics',n:22},{s:'Power BI',n:19}],
    goals:[{g:'Data Analyst',n:138},{g:'Web Developer',n:121},{g:'AI/ML Engineer',n:104},{g:'UI/UX Designer',n:65}],
    trend:[48,50,51,54,55,57,59,61],
    trendLabels:['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'],
    cohorts:[
      {c:'B.Tech CSE · Sem 6', n:142, r:66, p:71},
      {c:'B.Tech CSE · Sem 4', n:118, r:54, p:58},
      {c:'B.Tech IT · Sem 6', n:96, r:63, p:67},
      {c:'MCA · Sem 2', n:72, r:58, p:62},
    ],
  };

  const industry = {
    org:'Northwind Analytics Pvt. Ltd.', role:'Data Analyst',
    skills:[{s:'SQL',l:'Advanced'},{s:'Python',l:'Advanced'},{s:'Excel',l:'Intermediate'},{s:'Power BI',l:'Intermediate'}],
    matches:24, near:61,
    posted:[
      {t:'Retail Footfall Analysis', type:'Real-world project', apps:38, status:'Open'},
      {t:'Data Analyst Intern · 6 months', type:'Internship', apps:112, status:'Open'},
      {t:'Churn Signals Challenge', type:'Real-world project', apps:21, status:'Reviewing'},
    ],
  };

  return { LEVELS, student, roles, baseLevels, roadmap, resources, projects, completedProjects, questions, activity, notifications, institution, industry };
})();
