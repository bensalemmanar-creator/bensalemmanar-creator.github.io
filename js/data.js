/* =========================================================================
   Portfolio content — Manar Ben Salem
   Every fact below comes from the CV (Nov 2026), the GitHub READMEs,
   the project files (Rmd / do / ipynb / jasp) or the project slide decks.
   Items marked `todo` are placeholders that still need real material.
   ========================================================================= */

const GH = "https://github.com/bensalemmanar-creator";

window.PORTFOLIO = {
  /* ---------------------------------------------------------------- */
  dataProjects: [
    {
      id: "airbnb",
      no: "01",
      title: "Airbnb Price Forecasting — New York City",
      short: "Forecasting the monthly median Airbnb price in NYC and finding which model holds up on unseen months.",
      year: "2025",
      tool: "R",
      tags: ["Time series", "Forecasting", "R"],
      cover: "assets/img/projects/airbnb-forecast.webp",
      github: `${GH}/airbnb-nyc-price-forecasting-r`,
      context: "Course project — ITM508, South Mediterranean University",
      problem:
        "Hosts and analysts need a reliable view of where nightly prices are heading. The question was simple: which forecasting approach gives the most accurate monthly price on data it has never seen?",
      data:
        "Kaggle “New York City Airbnb Open Data (2019)” — AB_NYC_2019.csv. Listings were aggregated into a monthly median price by last-review month (Jan 2015 – Jun 2019).",
      tools: ["R", "forecast", "prophet", "tseries", "tidyverse", "ggplot2"],
      method: [
        "Removed listings with no review date, and prices of $0 or above $1,000 (invalid entries and extreme outliers).",
        "Built a monthly series (months with ≥ 10 listings) and smoothed remaining outliers with tsclean().",
        "ADF and KPSS gave conflicting results on the raw series; a log transform plus first differencing made both tests agree on stationarity.",
        "Time-ordered split: train Jan 2015 – Dec 2017, validation Jan – Jun 2018, test Jul 2018 – Jun 2019.",
        "Fitted ARIMA(0,1,1), SARIMA(0,0,0)(1,1,0)[12], ETS(M,N,N) and Prophet; compared RMSE, MAE and MAPE on the test year."
      ],
      chart: {
        type: "bars",
        title: "Test-period MAPE (lower is better)",
        unit: "%",
        best: "ETS",
        rows: [
          { label: "ETS (M,N,N)", key: "ETS", value: 3.97 },
          { label: "ARIMA (0,1,1)", key: "ARIMA", value: 4.06 },
          { label: "Prophet", key: "Prophet", value: 6.91 },
          { label: "SARIMA", key: "SARIMA", value: 12.33 }
        ]
      },
      table: {
        head: ["Model", "RMSE", "MAE", "MAPE"],
        rows: [
          ["ETS (M,N,N)", "4.84", "4.13", "3.97%"],
          ["ARIMA (0,1,1)", "4.92", "4.21", "4.06%"],
          ["Prophet", "8.16", "7.10", "6.91%"],
          ["SARIMA (0,0,0)(1,1,0)[12]", "14.76", "12.68", "12.33%"]
        ],
        highlight: 0
      },
      findings: [
        "ETS was the most accurate model: forecasts were on average within about 4% of the actual monthly median price.",
        "ARIMA came a close second, while SARIMA struggled — 36 training months give only three seasonal cycles to learn from.",
        "With a short history, a simple model that adapts to the recent price level beat more complex seasonal models."
      ],
      implications:
        "For short, noisy price histories, a parsimonious smoothing model is the safer baseline before investing in more complex seasonal models. The data is a single 2019 snapshot, so each price is tied to its last-review month and only approximates price over time.",
      gallery: [
        { src: "assets/img/projects/airbnb-forecast.webp", cap: "Actual vs. forecast on the test year (Jul 2018 – Jun 2019)" },
        { src: "assets/img/projects/airbnb-log-series.webp", cap: "Log-transformed monthly series used for stationarity testing" }
      ],
      code: `ets_model = ets(train)
forecast_ets = forecast(ets_model, h = length(val) + length(test))

mape = function(a, p) mean(abs((a - p) / a)) * 100
mape(actual_test, ets_test)   # 3.97 %`
    },
    {
      id: "credit",
      no: "02",
      title: "What Drives Corporate Bond Credit Spreads?",
      short: "An econometric study of why some firms pay more to borrow than others, across ~3,400 bonds in 34 countries.",
      year: "2025",
      tool: "Stata",
      tags: ["Econometrics", "OLS", "Stata"],
      cover: null,
      github: `${GH}/corporate-bond-credit-spreads-stata`,
      context: "Advanced Econometrics — team of 4, South Mediterranean University",
      problem:
        "Credit spreads are a proxy for a firm’s cost of debt. Which firm and country characteristics actually explain why some bonds carry a higher spread than others?",
      data:
        "About 3,500 corporate bonds from firms in 34 countries (3,408 used in the regressions). The spread variable is strongly right-skewed. The dataset is not published in the repository.",
      tools: ["Stata", "OLS", "VIF", "Breusch-Pagan"],
      method: [
        "Hypotheses: leverage, longer maturity and weaker debt enforcement raise spreads; profitability and better ratings lower them.",
        "Descriptive statistics, histograms and scatter plots against leverage, rating and profitability; pairwise correlations with significance.",
        "Baseline OLS, then multicollinearity (VIF) and heteroskedasticity (Breusch-Pagan) tests.",
        "Robust standard errors, standard errors clustered by country, and country fixed effects.",
        "Robustness checks: alternative leverage measure, firm size (log total assets), civil-law origin, callable bonds."
      ],
      matrix: {
        title: "Which determinants hold up?",
        cols: ["Baseline", "Robust SE", "Clustered by country"],
        rows: [
          { label: "Credit rating", cells: ["yes", "yes", "yes"], note: "Strongest, most robust driver" },
          { label: "Profitability", cells: ["yes", "yes", "no"] },
          { label: "Debt enforcement", cells: ["yes", "yes", "no"] },
          { label: "Maturity", cells: ["yes", "yes", "no"] },
          { label: "Leverage", cells: ["no", "—", "—"], note: "Significant with the alternative measure" }
        ],
        legend: "Significance as reported in the project README. “—” = not reported separately."
      },
      findings: [
        "Credit rating is the strongest and most robust determinant of spreads.",
        "Profitability, enforcement and maturity are significant in the baseline and with robust errors, but lose significance once errors are clustered by country.",
        "Leverage is insignificant in the baseline but significant with the alternative measure. Larger firms pay lower spreads; civil-law origin has no independent effect."
      ],
      implications:
        "Ratings carry most of the information lenders price in. Results that disappear under country clustering are a reminder to be careful with conclusions from cross-country data. Limits: a log of the skewed spread could help, 34 clusters make errors conservative, and OLS shows association, not causation.",
      gallery: [],
      code: `reg sprben_matlab levrage1 profitability sprat_numeric effsale maturity_years
vif
estat hettest
reg sprben_matlab levrage1 profitability sprat_numeric effsale maturity_years, ///
    vce(cluster country_id)`
    },
    {
      id: "gym",
      no: "03",
      title: "Fitness Club Member Segmentation",
      short: "Segmenting 400 members into three personas so a fitness club can target each group differently.",
      year: "2025",
      tool: "JASP",
      tags: ["Clustering", "ANOVA", "Personas"],
      cover: "assets/img/projects/gym-tsne.webp",
      github: `${GH}/gym-member-segmentation-jasp`,
      context: "Course project — South Mediterranean University",
      problem:
        "A fitness club wants to stop treating every member the same. Which natural groups exist, based on commitment and how members rate facilities and classes, and what should the club do for each?",
      data:
        "Survey of 400 members, 21 variables: demographics, composite scores for equipment quality, class variety and facility cleanliness, years of membership and weekly usage hours.",
      tools: ["JASP", "Model-based clustering", "ANOVA", "t-SNE"],
      method: [
        "Framework of three pillars: intensity of commitment, excellence of services and facilities, performance of the value proposition.",
        "Model-based clustering in JASP’s Machine Learning module — scaled inputs, BIC for model selection, maximum of 3 clusters.",
        "One-way ANOVA of weekly usage across clusters.",
        "Translated each cluster into a persona with a targeted strategy."
      ],
      stats: [
        { k: "F(2, 397)", v: "637.1" },
        { k: "ω²", v: "0.76" },
        { k: "Silhouette", v: "0.14" },
        { k: "BIC", v: "1573.9" }
      ],
      personas: [
        { name: "Key members", n: 209, hours: 11.6, desc: "Very high engagement; moderate view of facilities and value.", action: "Loyalty rewards, performance programs, keep equipment standards." },
        { name: "Experience-oriented", n: 73, hours: 5.6, desc: "Moderate engagement; positive view of services, facilities and value.", action: "Maintain excellence, expand training, referral incentives." },
        { name: "At-risk, low engagement", n: 118, hours: 4.1, desc: "Low engagement; poor view of services, facilities and value.", action: "Re-engagement campaigns, offers, satisfaction surveys." }
      ],
      findings: [
        "Members split mainly by how much they use the club; the heaviest users are the largest group (52%).",
        "The most satisfied members are not the heaviest users, and the least satisfied use the club least.",
        "Facility and class quality are the most likely levers to re-engage the at-risk group."
      ],
      implications:
        "Three personas give the club a concrete way to split its retention budget. Limits: weekly usage was a clustering input, so the ANOVA describes the segments rather than independently testing them; the low silhouette (0.14) means clusters overlap.",
      gallery: [
        { src: "assets/img/projects/gym-tsne.webp", cap: "t-SNE projection of the three clusters" },
        { src: "assets/img/projects/gym-cluster-means.webp", cap: "Standardised cluster means by variable" }
      ]
    },
    {
      id: "rain",
      no: "04",
      title: "Rain Prediction in Australia",
      short: "Predicting whether it will rain tomorrow from today’s weather — comparing five classifiers on imbalanced data.",
      year: "2026",
      tool: "Python",
      tags: ["Classification", "Machine learning", "Python"],
      cover: "assets/img/projects/rain-feature-importance.webp",
      github: `${GH}/rain-prediction-australia-python`,
      context: "Team of 3 — with Wiem Habbassi and Ghofrane Ayari",
      problem:
        "A dependable next-day rain warning helps farmers plan irrigation and harvest, event organisers decide on cover, construction teams schedule work and airports plan staff. Only ~22% of days are followed by rain, so the model must catch rain without drowning users in false alarms.",
      data:
        "Kaggle “Rain in Australia” — about 145,000 daily records from 49 locations (2007–2017), 16 numerical and 6 categorical columns. A 20,000-row sample kept the SVM and grid search fast.",
      tools: ["Python", "pandas", "scikit-learn", "SciPy", "seaborn", "Google Colab"],
      method: [
        "Descriptive analysis, missing values, duplicates; dry vs. rainy comparisons, seasonality and boxplots.",
        "Removed duplicates and unlabeled rows, dropped 4 columns with > 35% missing values, extracted month, imputed and encoded.",
        "Feature selection: removed redundant features by correlation, kept the top 10 by mutual information.",
        "Random undersampling on the training set only, keeping the validation set’s real class mix.",
        "Logistic regression, SVM, decision tree, random forest and gradient boosting — 5-fold grid search on ROC AUC, scaling inside the pipeline to prevent leakage."
      ],
      chart: {
        type: "bars",
        title: "Validation ROC AUC (higher is better)",
        unit: "",
        min: 0.75,
        max: 0.9,
        best: "SVM",
        rows: [
          { label: "SVM", key: "SVM", value: 0.86 },
          { label: "Random forest", key: "RF", value: 0.858 },
          { label: "Logistic regression", key: "LR", value: 0.853 },
          { label: "Gradient boosting", key: "GB", value: 0.853 },
          { label: "Decision tree", key: "DT", value: 0.815 }
        ]
      },
      table: {
        head: ["Model", "AUC", "Rain recall", "F1"],
        rows: [
          ["SVM (selected)", "0.860", "77.0%", "0.624"],
          ["Random forest", "0.858", "76.0%", "0.613"],
          ["Logistic regression", "0.853", "74.0%", "0.602"],
          ["Gradient boosting", "0.853", "74.1%", "0.602"],
          ["Decision tree", "0.815", "71.1%", "0.571"]
        ],
        highlight: 0
      },
      findings: [
        "The SVM was selected: AUC 0.860 and 77% of rainy days caught on validation.",
        "Undersampling raised the SVM’s rain recall from 48% to 77%; accuracy dipped from 84% to 79% but F1 improved.",
        "Strongest signals: 3 pm humidity, 9 am pressure, 9 am humidity and wind-gust speed — rain tends to follow high humidity, lower pressure and stronger gusts."
      ],
      implications:
        "Recommendation: deploy the SVM as a daily rain-tomorrow alert and let users tune the probability threshold — lower if missing rain is costly, higher to reduce false alarms. Sunshine and cloud cover were 40–48% missing, so better data collection is the next lever.",
      gallery: [
        { src: "assets/img/projects/rain-feature-importance.webp", cap: "Random forest — top 15 feature importances" },
        { src: "assets/img/projects/rain-mutual-info.webp", cap: "Mutual information with RainTomorrow — selected features" },
        { src: "assets/img/projects/rain-auc.webp", cap: "Validation AUC across the five classifiers" }
      ]
    }
  ],

  /* Power BI dashboards. Every figure below was computed from the data model
     inside each .pbix file (read with pbixray), using the DAX measures written in
     the report. Charts are redrawn on the site; they are not screenshots. */
  biDashboards: [
    {
      id: "churn",
      title: "Customer Churn: Databel",
      focus: "Why are telecom customers leaving, and where?",
      dataset: "Databel telecom customer dataset (DataCamp), 6,687 customers, 29 columns",
      pages: ["Data check", "Churn rate", "Churn by state"],
      headline: ["26.86%", "churn rate"],
      kpis: [["6,687", "Customers"], ["6,687", "Unique customers (no duplicates)"], ["1,796", "Churned customers"], ["26.86%", "Churn rate"]],
      charts: [
        { type: "bars", title: "Churned customers by churn category", data: [["Competitor", 805], ["Attitude", 287], ["Dissatisfaction", 286], ["Price", 200], ["Other", 191]] },
        { type: "bars", title: "Top churn reasons", data: [["Competitor made better offer", 303], ["Competitor had better devices", 297], ["Attitude of support person", 203], ["Don't know", 123], ["Competitor offered more data", 110], ["Competitor offered higher download speeds", 95]] },
        { type: "bars", title: "Highest churn rate by state (states with ≥ 30 customers)", unit: "%", data: [["CA", 63.2], ["OH", 34.8], ["PA", 33.3], ["MD", 32.9], ["NE", 32.8], ["NH", 32.1]] }
      ],
      insights: [
        "About 1 in 4 customers (26.9%) churned.",
        "Competitors are the main reason, at 45% of churned customers: better offers and better devices top the list.",
        "Support-staff attitude is the third most common single reason, and the most controllable one.",
        "California stands out with a 63% churn rate, almost double the next state."
      ],
      dax: [
        ["Churned (calculated column)", "IF('Databel - Data'[Churn Label] = \"No\", 0, 1)"],
        ["Number of churned customers", "SUM('Databel - Data'[Churned])"],
        ["Churn Rate", "[Number of churned customers] / [Number of Customers]"]
      ]
    },
    {
      id: "retail",
      title: "Retail Analysis",
      focus: "How are the two store chains performing against last year, and how are new stores doing?",
      dataset: "Microsoft’s Retail Analysis sample: 104 stores, two chains (Fashions Direct, Lindseys), Jan–Aug 2014",
      pages: ["KPI", "New stores", "Regular vs. markdown", "This year vs. last year", "Revenue trend"],
      headline: ["−4.7%", "sales vs. last year"],
      kpis: [["$22.05M", "Sales this year"], ["$23.13M", "Sales last year"], ["104", "Total stores"], ["10", "New stores (2014)"]],
      charts: [
        { type: "grouped", title: "This year vs. last year by chain ($)", series: ["This year", "Last year"], data: [["Fashions Direct", 15658108, 16352432], ["Lindseys", 6393844, 6780169]] },
        { type: "line", title: "Sales this year by fiscal month ($)", data: [["Jan", 1683281], ["Feb", 2584457], ["Mar", 3747393], ["Apr", 2665971], ["May", 2754661], ["Jun", 3102896], ["Jul", 2329330], ["Aug", 3183964]] },
        { type: "donut", title: "Units sold this year: regular vs. markdown", data: [["Regular", 3488826], ["Markdown", 526565]] },
        { type: "bars", title: "New stores: annualised sales per sq ft ($)", data: [["Winchester FD", 21], ["Sharonville FD", 18], ["York FD", 15], ["Monroeville FD", 15], ["Knoxville Lindseys", 15], ["Washington FD", 14], ["Wilson Lindseys", 13], ["Cincinnati 2 FD", 13], ["Ft. Oglethorpe Lindseys", 12], ["Pasadena Lindseys", 11]] }
      ],
      insights: [
        "Both chains are below last year: Fashions Direct −$694K (−4.2%) and Lindseys −$386K (−5.7%).",
        "March was the strongest month; January the weakest.",
        "About 13% of units were sold at markdown prices.",
        "Among the 10 new stores, sales per sq ft range from $11 to $21, roughly a 2× spread worth investigating."
      ],
      dax: [
        ["TotalSalesTY", "CALCULATE([TotalSales], Sales[ScenarioID] = 1)"],
        ["Total Sales Var %", "IF([TotalSalesLY] <> 0, [Total Sales Var] / [TotalSalesLY], BLANK())"],
        ["Sales Per Sq Ft", "([TotalSalesTY] / (DISTINCTCOUNT([MonthID]) * SUM(Store[SellingAreaSize]))) * 12"],
        ["Store Type (calculated column)", "IF([Open Year] = 2014, \"New Store\", \"Same Store\")"]
      ]
    },
    {
      id: "superstore",
      title: "Superstore Sales",
      focus: "Which categories, segments and regions drive sales and profit, and are orders shipped on time?",
      dataset: "Sample Superstore (Excel), 1,746 orders, 2010–2013",
      pages: ["Sales by category", "Segments", "Sales by year", "Sales by region", "Totals", "Days to ship"],
      headline: ["10.6%", "profit margin"],
      kpis: [["$2.77M", "Total sales"], ["$292K", "Total profit"], ["10.56%", "Profit margin"], ["1,746", "Distinct orders"]],
      charts: [
        { type: "columns", title: "Sales by product category ($)", data: [["Furniture", 1058838], ["Technology", 1051067], ["Office Supplies", 658784]] },
        { type: "line", title: "Sales by year ($)", data: [["2010", 636204], ["2011", 587605], ["2012", 760696], ["2013", 784183]] },
        { type: "bars", title: "Profit margin by customer segment", unit: "%", data: [["Small Business", 14.4], ["Corporate", 12.6], ["Home Office", 8.6], ["Consumer", 6.2]] },
        { type: "donut", title: "Sales by region", data: [["West", 1282118], ["East", 982962], ["South", 503610]] }
      ],
      insights: [
        "Furniture and Technology bring in almost the same revenue, together 76% of sales.",
        "Corporate is the biggest segment by sales, but Small Business earns the best margin (14.4% vs. 6.2% for Consumer).",
        "Sales dipped in 2011, then grew in 2012 and 2013.",
        "Orders take 2.1 days to ship on average; 13.8% are flagged “Delayed” (more than 3 days)."
      ],
      dax: [
        ["Profit Margin", "[Total Profit] / [Total Sales]"],
        ["Days to ship (calculated column)", "DATEDIFF(Orders[Order Date], Orders[Ship Date], DAY)"],
        ["Order Status (calculated column)", "IF(Orders[Days to ship] > 3, \"Delayed\", \"On time\")"],
        ["Average sales in all segments", "CALCULATE(AVERAGE(Orders[Sales]), ALL(Orders[Customer Segment]))"]
      ]
    },
    {
      id: "global",
      title: "Global Analytics",
      focus: "Which markets and segments generate the most sales and profit, and how do customers ship?",
      dataset: "Global Superstore sample: orders across 5 markets, with returns and regional managers",
      pages: ["KPI", "Preferred ship mode", "Sales", "General information"],
      headline: ["$1.47M", "total profit"],
      kpis: [["$12.64M", "Total sales"], ["$1.47M", "Total profit"], ["178,312", "Units sold"], ["1,079", "Returned orders"]],
      charts: [
        { type: "bars", title: "Total profit by market ($)", data: [["Europe", 449552], ["Asia Pacific", 403176], ["USCA", 304214], ["LATAM", 221643], ["Africa", 88872]] },
        { type: "donut", title: "Sales by market", data: [["Asia Pacific", 4042658], ["Europe", 3287336], ["USCA", 2364129], ["LATAM", 2164605], ["Africa", 783773]] },
        { type: "donut", title: "Sales by segment", data: [["Consumer", 6507949], ["Corporate", 3824698], ["Home Office", 2309855]] },
        { type: "columns", title: "Order lines by ship mode", data: [["Standard", 30775], ["Second", 10309], ["First", 7505], ["Same Day", 2701]] }
      ],
      insights: [
        "Asia Pacific sells the most, but Europe is the most profitable market.",
        "Consumers account for about half of all sales.",
        "Standard Class is by far the preferred ship mode (60% of order lines); Same Day is rare."
      ],
      dax: [
        ["Total Profit", "SUM(Orders[Profit])"],
        ["Customer number", "COUNT(Orders[Customer ID])"]
      ]
    },
    {
      id: "delivery",
      title: "Delivery Case: Pareto Analysis",
      focus: "Do a few customers generate most of the revenue (the 80/20 rule)?",
      dataset: "Small course case (orders and customers tables)",
      pages: ["Pareto", "Pareto (alternative build)"],
      headline: ["80%", "Pareto goal line"],
      kpis: [["4", "Customers"], ["$2,200", "Total sales"], ["3", "Customers to reach 80%"]],
      charts: [
        { type: "pareto", title: "Sales by customer with cumulative % and 80% goal", data: [["Customer 1", 700, 31.8], ["Customer 2", 600, 59.1], ["Customer 3", 500, 81.8], ["Customer 4", 400, 100]] }
      ],
      insights: [
        "The cumulative line crosses the 80% goal at the third customer.",
        "The dataset is a small teaching case. The point was building the ranking and cumulative-share logic in DAX, which scales to any customer base."
      ],
      dax: [
        ["Customer Sales Rank", "RANKX(ALL('Orders by Customers'[Customer Name]), [Total Sales], , DESC)"],
        ["Cumulative Sales %", "DIVIDE([Cumulative Sales], CALCULATE([Total Sales], ALL('Orders by Customers'[Customer Name])))"],
        ["Goal 80%", "0.8"]
      ]
    }
  ],

  /* ---------------------------------------------------------------- */
  /* Manual Figma work. Content is taken from the screens in each Figma file. */
  manualDesign: [
    {
      id: "laguz",
      title: "Laguz Logistics Website",
      kind: "Company website · Desktop, tablet & mobile",
      cover: "assets/img/projects/laguz-responsive.webp",
      short: "A full responsive website for Laguz Trading & Logistics PLC, designed while I worked there in Addis Ababa (2024–25).",
      overview:
        "The company website for a freight-forwarding firm in Ethiopia: home page, company overview, a page for each service (air, sea and road freight, warehousing, customs clearance, coffee & seeds export), clients, a get-a-quote form and contact. Every page is designed at four breakpoints: desktop (1280), tablet landscape (990), tablet portrait (834) and mobile (430).",
      problem:
        "Laguz needed a professional online presence that explains a wide range of logistics services clearly and turns visitors into quote requests, on whatever device a client uses.",
      role:
        "Designed the website in Figma as part of my role as Junior Operations & Business Development Officer, alongside the company’s LinkedIn content (engagement up 60%). Day-to-day operations work (freight quotes, Incoterms, shipment follow-up) gave me first-hand knowledge of the services the site presents.",
      process: [
        "Mapped the site structure around the services clients actually ask for: air, sea and road freight, warehousing, customs clearance and coffee & seeds export.",
        "Built a reusable component set: navigation bars per breakpoint, menu buttons, service cards, key-figure blocks, testimonial carousels and image components.",
        "Designed the desktop pages first, then adapted every page to tablet and mobile layouts.",
        "Applied one visual system across all pages: Laguz orange and charcoal, strong photography, and a clear call to action (“Get a quote”) on every page.",
        "Extended the brand to print: a company catalogue and roll-up banners in the same file."
      ],
      figma: "https://www.figma.com/design/uOQusyKugv4JQ8zRtRGEDE/Logistics-website-LAGUZ",
      gallery: [
        { src: "assets/img/projects/laguz-hero.webp", cap: "Home: hero and value proposition (desktop)" },
        { src: "assets/img/projects/laguz-services.webp", cap: "Home: services section" },
        { src: "assets/img/projects/laguz-workflow.webp", cap: "Home: logistics workflow and clients" },
        { src: "assets/img/projects/laguz-air-freight.webp", cap: "Service page: air freight" },
        { src: "assets/img/projects/laguz-quote.webp", cap: "Get-a-quote page" },
        { src: "assets/img/projects/laguz-mobile.webp", cap: "Home page on mobile (430 px)" }
      ]
    },
    {
      id: "recipe",
      title: "DBARA: Recipe App",
      kind: "Mobile app · iOS-size screens",
      cover: "assets/img/projects/recipe-cover.webp",
      short: "A smart recipe app concept centred on Tunisian home cooking: generate a dish from what you have, then follow it step by step.",
      overview:
        "DBARA is an AI-powered cooking assistant concept. Users can search their recipe book, or generate a recipe from a dish name, the ingredients they have, the time available and the difficulty they want, then follow an ingredients-and-instructions view. A Pro plan adds calories, nutritionist chat and video tutorials.",
      problem:
        "Deciding what to cook, with what’s already in the kitchen and limited time, is a daily friction. The app turns that into a short guided flow.",
      role: "Designed all screens by hand in Figma: information architecture, flows, layout, iconography and visual style.",
      process: [
        "Onboarding that states the value in four lines, then a single “Get started”.",
        "A guided generator: dish name → ingredients → time available → difficulty, one question per screen with a fixed “Next” button.",
        "Recipe detail with a full-bleed food photo, then a swipe-up sheet that switches between Ingredients (checklist) and Instructions.",
        "Freemium model designed in: crown icons mark Pro features, with a dedicated upgrade screen (monthly and yearly plans).",
        "Consistent top navigation (generate, recipe book, challenges, chat, profile) and a calm mint-green palette."
      ],
      figma: "https://www.figma.com/design/lCXR3muBSEKQEKUBvw9kug/RECIPE-APP",
      gallery: [
        { src: "assets/img/projects/recipe-cover.webp", cap: "Onboarding, generator and recipe detail" },
        { src: "assets/img/projects/recipe-all-screens.webp", cap: "All 11 screens: onboarding, Pro plan, recipe book, guided generator, recipe view, profile" }
      ]
    },
    {
      id: "tabu",
      title: "TABU: Mental Health App",
      kind: "Mobile app · iOS-size screens",
      cover: "assets/img/projects/tabu-cover.webp",
      short: "“Towards a better U”: a mental-health companion app with self-assessment tests, wellbeing tools, a community and an emergency call button.",
      overview:
        "TABU helps users manage stress, anxiety and other mental-health challenges. After sign-up, users can take screening tests (depression, anxiety, ADHD, PTSD and more), get recommended books, videos and games, use tools such as breathing exercises and mood boosters, contact a psychologist, and share progress in a community feed.",
      problem:
        "People dealing with stress, anxiety or depression often don’t know where to start. The app gathers self-assessment, resources, professional contact and peer support in one place, with a one-tap emergency call always within reach.",
      role: "Designed the app’s screens by hand in Figma: flows, layout, components (buttons, nav bar, cards) and the soft visual identity.",
      process: [
        "Onboarding and registration (including a +216 Tunisian phone field), plus sign-in.",
        "An optional “get to know you” step with seven screening tests, which can be skipped.",
        "Home with recommended books, videos and games; a Community tab with posts, likes and follows.",
        "A Tools hub (books, mood boosters, games, psychologist contact, breathing exercises, videos, events, tests) with an always-visible Emergency call.",
        "Premium tier (coaching, yoga, group therapy, full library) and a profile with friends, saved items and settings.",
        "Soft pastel palette and illustrations, chosen to feel calm and non-clinical."
      ],
      figma: "https://www.figma.com/design/6QRxSQNHLj6sGQ5g8sTTG1/TABU-APP",
      gallery: [
        { src: "assets/img/projects/tabu-cover.webp", cap: "Onboarding, home and tools hub" },
        { src: "assets/img/projects/tabu-flow.webp", cap: "Registration, screening tests, community and premium" },
        { src: "assets/img/projects/tabu-all-screens.webp", cap: "All 10 screens" }
      ]
    }
  ],

  /* ---------------------------------------------------------------- */
  aiDesign: [
    {
      id: "saba",
      title: "SABA GrowTrack",
      badge: "1st place — Behavioral Design Thinking competition",
      year: "2025",
      kind: "Agri-fintech platform · Team of 5",
      cover: "assets/img/projects/saba-agronomist-dashboard.webp",
      short:
        "A platform concept that helps small Tunisian farmers get bank loans by turning drone scans and agronomist visits into verified crop data that banks can trust.",
      problem:
        "Small and medium farmers struggle to get credit. Banks can’t easily verify a farm’s condition or a crop’s risk, and farmers lack documented, trusted data. The team traced financing failure to mistrust, unreliable data and high agricultural risk.",
      process: [
        "Defined and refined the scope: small farmers growing tomatoes, eggplants and potatoes.",
        "Root-cause analysis, three personas (farmer, agronomist, banker) and a customer journey.",
        "Expert interview with the director of a local agricultural company.",
        "Value propositions per actor, product vision, backlog, roadmap and a marketing campaign.",
        "Interface generated with AI prompting in Figma Make, then reviewed and iterated into two portals."
      ],
      aiTools: ["Figma Make (prompt-to-app)"],
      aiNote:
        "The interface was produced by prompting Figma Make, which generated the screens and a working React code bundle. The team’s own work is the research, design-thinking artefacts, requirements and the iterations that shaped what the AI produced.",
      outcome:
        "Agronomist portal (dashboard, field file with growth timeline, drone insights, loan files, marketplace, pre-harvest sales, messages) and bank portal (portfolio, farmer profile, risk dashboard, reports). Won 1st place in the course competition.",
      role:
        "One of five team members across research, personas, value propositions and the prototype.",
      prototype: "prototypes/saba-growtrack/index.html",
      figma: "https://www.figma.com/make/np7MB2jo21LhVonvKmimAk/SABA-GrowTrack-Dashboard-Design",
      github: `${GH}/SABA-Growtrack`,
      gallery: [
        { src: "assets/img/projects/saba-portal-select.webp", cap: "Entry screen — choose the agronomist or bank portal" },
        { src: "assets/img/projects/saba-agronomist-dashboard.webp", cap: "Agronomist portal — dashboard with drone-scan health zones" },
        { src: "assets/img/projects/saba-loan-file.webp", cap: "Agronomist portal — loan file, marketplace and pre-harvest" },
        { src: "assets/img/projects/saba-bank-portfolio.webp", cap: "Bank portal — portfolio and farmer profile" },
        { src: "assets/img/projects/saba-risk-dashboard.webp", cap: "Bank portal — risk dashboard and reports" },
        { src: "assets/img/projects/saba-journey.webp", cap: "Research — the farmer’s journey to a loan" }
      ]
    },
    {
      id: "legacy",
      title: "LegacyOS",
      badge: "Hackathon project",
      year: "2026",
      kind: "AI due-diligence tool for private equity · Team of 3",
      cover: null,
      short:
        "An AI due-diligence tool that helps private-equity investors measure how much a founder-led SME depends on its founder — and how transferable the business really is.",
      problem:
        "Most Tunisian firms are SMEs, often founder-led and family-owned. Their profits can depend on the founder’s personal control rather than formal systems: undocumented processes, informal decisions, personal client and supplier relationships. Investors risk overpaying for a business that is not transferable. The core question: “Are we buying a real company, or the founder’s personal operating system?”",
      process: [
        "Framed the problem and backed it with a literature review (SME share of firms, family-firm GDP share, financing gap).",
        "Wrote a detailed product specification — users, workflow, screens, palette, tone — used as the prompt.",
        "Generated the high-fidelity prototype in Figma Make from that specification and iterated on it.",
        "Built the pitch: business model (per-company fee, annual subscription, 100-day monitoring add-on) and ethical safeguards."
      ],
      aiTools: ["Figma Make (prompt-to-app)"],
      aiNote:
        "The prototype was generated by prompting Figma Make with a structured spec (screens, user journey, colour palette, typography). The design decisions live in that prompt; the AI rendered them.",
      outcome:
        "A click-through flow: create project → upload company documents → company profile form → AI analysis → founder-dependency dashboard → analytics → risk findings → 100-day action plan → exportable PE memo.",
      role: "One of three team members (with Anas Saadi and Mustapha Maiz).",
      prototype: "prototypes/legacyos/index.html",
      figma: "https://www.figma.com/make/s60CnXQ7UZE9pRXUhwapyy/Create-new-component--Copy-",
      github: `${GH}/Legacyoscapaihakathon`,
      gallery: []
    }
  ]
};
