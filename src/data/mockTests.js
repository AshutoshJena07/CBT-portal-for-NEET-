// High-yield NEET Mock Tests data with authentic questions, options, step-by-step solutions and NCERT references.

export const MOCK_TESTS = [
  {
    id: 'neet-full-mock-1',
    title: 'NEET (UG) All India Grand Mock Test - 01',
    subtitle: 'Full Syllabus NTA Pattern (Physics, Chemistry, Botany, Zoology)',
    category: 'Full Mock',
    durationMinutes: 200, // 3 hours 20 mins
    totalMarks: 720,
    passingMarks: 500,
    difficulty: 'Moderate-Hard',
    tags: ['Full Syllabus', 'NTA Pattern', '720 Marks', 'High Yield'],
    description: 'Realistic full-length NEET exam simulation based on the latest NTA curriculum with Section A (35 Qs) & Section B (15 Qs) across all 4 subjects.',
    sections: [
      { id: 'physics-a', name: 'Physics Section A', subject: 'Physics', section: 'A', totalQuestions: 15, maxAttempts: 15 },
      { id: 'physics-b', name: 'Physics Section B', subject: 'Physics', section: 'B', totalQuestions: 5, maxAttempts: 5 },
      { id: 'chemistry-a', name: 'Chemistry Section A', subject: 'Chemistry', section: 'A', totalQuestions: 15, maxAttempts: 15 },
      { id: 'chemistry-b', name: 'Chemistry Section B', subject: 'Chemistry', section: 'B', totalQuestions: 5, maxAttempts: 5 },
      { id: 'botany-a', name: 'Botany Section A', subject: 'Botany', section: 'A', totalQuestions: 15, maxAttempts: 15 },
      { id: 'botany-b', name: 'Botany Section B', subject: 'Botany', section: 'B', totalQuestions: 5, maxAttempts: 5 },
      { id: 'zoology-a', name: 'Zoology Section A', subject: 'Zoology', section: 'A', totalQuestions: 15, maxAttempts: 15 },
      { id: 'zoology-b', name: 'Zoology Section B', subject: 'Zoology', section: 'B', totalQuestions: 5, maxAttempts: 5 },
    ],
    questions: [
      // ================= PHYSICS SECTION A =================
      {
        id: 'p-1',
        subject: 'Physics',
        section: 'A',
        topic: 'Units and Measurements',
        question: 'The dimensions of (μ₀ · ε₀)^(-1/2) are equivalent to which of the following physical quantities?',
        options: [
          'Speed of light [L T⁻¹]',
          'Energy density [M L⁻¹ T⁻²]',
          'Acceleration [L T⁻²]',
          'Frequency [T⁻¹]'
        ],
        correctAnswer: 0,
        explanation: 'According to Maxwell’s electromagnetic equations, the speed of light in vacuum is given by c = 1 / √(μ₀ · ε₀) = (μ₀ · ε₀)^(-1/2). Therefore, the dimensions are [L T⁻¹].'
      },
      {
        id: 'p-2',
        subject: 'Physics',
        section: 'A',
        topic: 'Kinematics in a Straight Line',
        question: 'A ball is thrown vertically upwards with a velocity of 20 m/s from the top of a 25 m high tower. Taking g = 10 m/s², how much total time will the ball take to strike the ground?',
        options: [
          '3 seconds',
          '5 seconds',
          '4 seconds',
          '6 seconds'
        ],
        correctAnswer: 1,
        explanation: 'Using the displacement equation: s = ut + ½ at².\nTaking upward as positive: s = -25 m, u = +20 m/s, a = -10 m/s².\n-25 = 20t - 5t² => 5t² - 20t - 25 = 0 => t² - 4t - 5 = 0.\n(t - 5)(t + 1) = 0 => t = 5 s (since time cannot be negative).'
      },
      {
        id: 'p-3',
        subject: 'Physics',
        section: 'A',
        topic: 'Work, Energy and Power',
        question: 'A body of mass 2 kg moving under a central force has potential energy U(r) = a/r² - b/r, where a and b are positive constants. The equilibrium radius r_eq is given by:',
        options: [
          'r = 2a / b',
          'r = a / b',
          'r = b / 2a',
          'r = √(a / b)'
        ],
        correctAnswer: 0,
        explanation: 'At equilibrium, the conservative force F = -dU/dr = 0.\nU(r) = a r⁻² - b r⁻¹ => dU/dr = -2a r⁻³ + b r⁻² = 0.\n2a / r³ = b / r² => r = 2a / b.'
      },
      {
        id: 'p-4',
        subject: 'Physics',
        section: 'A',
        topic: 'Gravitation',
        question: 'If the radius of the Earth shrinks by 1% while its mass remains constant, the acceleration due to gravity on the Earth’s surface will:',
        options: [
          'Decrease by 1%',
          'Increase by 2%',
          'Decrease by 2%',
          'Remain unchanged'
        ],
        correctAnswer: 1,
        explanation: 'Surface gravity is g = G·M / R².\nFor fractional changes when ΔR/R is small: Δg/g ≈ -2(ΔR/R).\nGiven ΔR/R = -1% (shrinks), Δg/g = -2(-1%) = +2%. Thus, g increases by approximately 2%.'
      },
      {
        id: 'p-5',
        subject: 'Physics',
        section: 'A',
        topic: 'Current Electricity',
        question: 'In a potentiometer arrangement, a cell of emf 1.25 V gives a balance point at 35.0 cm length of wire. If this cell is replaced by another cell and the balance point shifts to 63.0 cm, the emf of the second cell is:',
        options: [
          '2.00 V',
          '2.25 V',
          '2.50 V',
          '1.85 V'
        ],
        correctAnswer: 1,
        explanation: 'In a potentiometer: E₁ / E₂ = l₁ / l₂.\nE₂ = E₁ · (l₂ / l₁) = 1.25 V · (63.0 / 35.0) = 1.25 · 1.8 = 2.25 V.'
      },
      {
        id: 'p-6',
        subject: 'Physics',
        section: 'A',
        topic: 'Electrostatics',
        question: 'Two point charges +4q and +q are placed at a distance L apart. Where should a third charge Q be placed along the line connecting them so that it remains in electrostatic equilibrium?',
        options: [
          'At distance 2L/3 from +4q',
          'At distance L/3 from +4q',
          'At distance L/2 from +4q',
          'At distance 3L/4 from +4q'
        ],
        correctAnswer: 0,
        explanation: 'Let Q be placed at distance x from +4q. For net force on Q to be zero:\nk(4q)(Q) / x² = k(q)(Q) / (L - x)²\n=> 4 / x² = 1 / (L - x)²\nTaking square root: 2 / x = 1 / (L - x) => 2L - 2x = x => 3x = 2L => x = 2L/3 from charge +4q.'
      },
      {
        id: 'p-7',
        subject: 'Physics',
        section: 'A',
        topic: 'Optics',
        question: 'A convex lens of focal length 20 cm in air is immersed in water (refractive index of glass = 1.5, refractive index of water = 4/3). The new focal length in water will be:',
        options: [
          '40 cm',
          '60 cm',
          '80 cm',
          '100 cm'
        ],
        correctAnswer: 2,
        explanation: 'Lens maker formula: 1/f = (μ_rel - 1)(1/R₁ - 1/R₂).\nIn air: 1/20 = (1.5 - 1) · K = 0.5 K => K = 1/10.\nIn water: 1/f_w = ( (1.5 / (4/3)) - 1 ) · K = (9/8 - 1) · (1/10) = (1/8) · (1/10) = 1/80.\nHence f_w = 80 cm.'
      },
      {
        id: 'p-8',
        subject: 'Physics',
        section: 'A',
        topic: 'Modern Physics',
        question: 'The de-Broglie wavelength of an electron accelerated through a potential difference of 100 V is approximately:',
        options: [
          '0.123 nm',
          '1.227 nm',
          '0.012 nm',
          '12.27 nm'
        ],
        correctAnswer: 0,
        explanation: 'For an electron: λ = 12.27 / √V Å = 12.27 / √100 Å = 1.227 Å = 0.1227 nm ≈ 0.123 nm.'
      },
      {
        id: 'p-9',
        subject: 'Physics',
        section: 'A',
        topic: 'Semiconductors',
        question: 'In a p-n junction diode at reverse bias, the width of the depletion region and the barrier height respectively:',
        options: [
          'Both decrease',
          'Both increase',
          'Depletion width decreases, barrier height increases',
          'Depletion width increases, barrier height decreases'
        ],
        correctAnswer: 1,
        explanation: 'Under reverse bias, external voltage aids the built-in potential, increasing the total barrier height (V₀ + V_r) and pushing majority carriers away from the junction, thereby increasing the depletion region width.'
      },
      {
        id: 'p-10',
        subject: 'Physics',
        section: 'A',
        topic: 'Thermodynamics',
        question: 'An ideal Carnot engine operates between temperatures 500 K and 300 K. Its thermal efficiency is:',
        options: [
          '20%',
          '40%',
          '60%',
          '33.3%'
        ],
        correctAnswer: 1,
        explanation: 'Efficiency η = 1 - (T_sink / T_source) = 1 - (300 / 500) = 1 - 0.6 = 0.40 = 40%.'
      },
      {
        id: 'p-11',
        subject: 'Physics',
        section: 'A',
        topic: 'Oscillations (SHM)',
        question: 'A particle executes simple harmonic motion with an amplitude of 4 cm. At what displacement from the mean position is its kinetic energy equal to its potential energy?',
        options: [
          '2 cm',
          '2√2 cm',
          '√2 cm',
          '3 cm'
        ],
        correctAnswer: 1,
        explanation: 'KE = ½ mω² (A² - x²) and PE = ½ mω² x².\nWhen KE = PE => A² - x² = x² => 2x² = A² => x = A / √2.\nWith A = 4 cm: x = 4 / √2 = 2√2 cm.'
      },
      {
        id: 'p-12',
        subject: 'Physics',
        section: 'A',
        topic: 'Magnetic Effects of Current',
        question: 'A circular coil of radius R carries a current I. The ratio of magnetic field at the center of the coil to that at an axial point distance R from the center is:',
        options: [
          '2√2 : 1',
          '√2 : 1',
          '4 : 1',
          '8 : 1'
        ],
        correctAnswer: 0,
        explanation: 'B_center = μ₀ I / (2R).\nB_axis = μ₀ I R² / [2(R² + x²)^(3/2)]. At x = R, B_axis = μ₀ I R² / [2(2R²)^(3/2)] = μ₀ I / [2R · 2√2].\nTherefore, B_center / B_axis = 2√2 : 1.'
      },
      {
        id: 'p-13',
        subject: 'Physics',
        section: 'A',
        topic: 'Wave Optics',
        question: 'In Young’s double slit experiment, if the separation between the slits is halved and the distance between the slits and the screen is doubled, the fringe width will become:',
        options: [
          'Half',
          'Double',
          'Four times',
          'Unchanged'
        ],
        correctAnswer: 2,
        explanation: 'Fringe width β = λD / d.\nNew fringe width β\' = λ (2D) / (d/2) = 4 (λD / d) = 4β (four times).'
      },
      {
        id: 'p-14',
        subject: 'Physics',
        section: 'A',
        topic: 'Rotational Motion',
        question: 'The ratio of the radius of gyration of a thin uniform circular disc about its diameter to that about an axis perpendicular to its plane through its center is:',
        options: [
          '1 : 2',
          '1 : √2',
          '√2 : 1',
          '2 : 1'
        ],
        correctAnswer: 1,
        explanation: 'For a disc:\nI_diameter = ¼ MR² => k_diameter = R/2.\nI_perpendicular = ½ MR² => k_perp = R/√2.\nRatio = (R/2) / (R/√2) = √2 / 2 = 1 / √2.'
      },
      {
        id: 'p-15',
        subject: 'Physics',
        section: 'A',
        topic: 'Electromagnetic Induction',
        question: 'A copper ring is held horizontally and a bar magnet is dropped through the ring with its north pole pointing downwards. The acceleration of the falling magnet is:',
        options: [
          'Equal to g',
          'Greater than g',
          'Less than g',
          'Zero'
        ],
        correctAnswer: 2,
        explanation: 'By Lenz\'s law, induced currents in the copper ring oppose the cause producing it (the downward motion of the magnet). A repulsive magnetic force acts upward on the magnet, resulting in a net acceleration less than g.'
      },

      // ================= PHYSICS SECTION B =================
      {
        id: 'p-16',
        subject: 'Physics',
        section: 'B',
        topic: 'Fluid Mechanics',
        question: 'Two capillary tubes of radii 0.2 cm and 0.4 cm are dipped in the same liquid. The ratio of heights of liquid column in the two tubes (h₁ : h₂) is:',
        options: [
          '1 : 2',
          '2 : 1',
          '4 : 1',
          '1 : 4'
        ],
        correctAnswer: 1,
        explanation: 'Capillary rise formula: h = 2T cosθ / (r ρ g) => h ∝ 1/r.\nTherefore, h₁ / h₂ = r₂ / r₁ = 0.4 / 0.2 = 2 : 1.'
      },
      {
        id: 'p-17',
        subject: 'Physics',
        section: 'B',
        topic: 'Alternating Current',
        question: 'In a series LCR circuit, R = 10 Ω, X_L = 20 Ω, and X_C = 10 Ω. The phase angle φ between the alternating current and applied voltage is:',
        options: [
          '30° voltage leads',
          '45° voltage leads',
          '45° current leads',
          '60° voltage leads'
        ],
        correctAnswer: 1,
        explanation: 'tan φ = (X_L - X_C) / R = (20 - 10) / 10 = 10/10 = 1.\nSince tan φ = 1, φ = 45°. Since X_L > X_C, the circuit is inductive and voltage leads current by 45°.'
      },
      {
        id: 'p-18',
        subject: 'Physics',
        section: 'B',
        topic: 'Nuclear Physics',
        question: 'The half-life of a radioactive substance is 30 days. The time taken for 75% of the radioactive nuclei to disintegrate is:',
        options: [
          '45 days',
          '60 days',
          '90 days',
          '120 days'
        ],
        correctAnswer: 1,
        explanation: '75% disintegrated means 25% (which is ¼ = (½)²) remains un-decayed.\nNumber of half-lives n = 2.\nTotal time = n × T_half = 2 × 30 days = 60 days.'
      },
      {
        id: 'p-19',
        subject: 'Physics',
        section: 'B',
        topic: 'Thermal Properties of Matter',
        question: 'A black body at 227°C radiates heat at the rate of 20 cal/(cm²·s). At what temperature in °C will it radiate heat at 320 cal/(cm²·s)?',
        options: [
          '500°C',
          '727°C',
          '1000°C',
          '454°C'
        ],
        correctAnswer: 1,
        explanation: 'According to Stefan-Boltzmann Law: E ∝ T⁴ (where T is in Kelvin).\nT₁ = 227 + 273 = 500 K.\nE₂ / E₁ = (T₂ / T₁)⁴ => 320 / 20 = 16 = (T₂ / 500)⁴.\nTaking 4th root: 2 = T₂ / 500 => T₂ = 1000 K.\nConverting to Celsius: 1000 - 273 = 727°C.'
      },
      {
        id: 'p-20',
        subject: 'Physics',
        section: 'B',
        topic: 'Wave Motion',
        question: 'An open organ pipe of length L resonates in its fundamental mode. If one end is closed, the new fundamental frequency will be:',
        options: [
          'Double the original',
          'Half the original',
          'Same as original',
          'Four times original'
        ],
        correctAnswer: 1,
        explanation: 'Fundamental frequency of open organ pipe: f_open = v / (2L).\nFundamental frequency of closed organ pipe of same length: f_closed = v / (4L).\nHence f_closed = ½ f_open.'
      },

      // ================= CHEMISTRY SECTION A =================
      {
        id: 'c-1',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Chemical Bonding & Molecular Structure',
        question: 'Which of the following molecules has a trigonal bipyramidal geometry according to VSEPR theory?',
        options: [
          'SF₆',
          'PCl₅',
          'CH₄',
          'NH₃'
        ],
        correctAnswer: 1,
        explanation: 'PCl₅ has 5 bonding pairs and 0 lone pairs around phosphorus (steric number = 5, sp³d hybridization), giving it a symmetrical trigonal bipyramidal geometry.'
      },
      {
        id: 'c-2',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Thermodynamics',
        question: 'For a spontaneous process at constant temperature and pressure, which condition must always hold true?',
        options: [
          'ΔH < 0',
          'ΔS_system > 0',
          'ΔG_system < 0',
          'ΔG_system > 0'
        ],
        correctAnswer: 2,
        explanation: 'The criterion for spontaneity at constant temperature and pressure is that the change in Gibbs Free Energy of the system must be negative: ΔG = ΔH - TΔS < 0.'
      },
      {
        id: 'c-3',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Equilibrium',
        question: 'The pH of a 0.001 M NaOH aqueous solution at 25°C is:',
        options: [
          '3',
          '7',
          '11',
          '14'
        ],
        correctAnswer: 2,
        explanation: '[OH⁻] = 0.001 M = 10⁻³ M.\npOH = -log[OH⁻] = -log(10⁻³) = 3.\nSince pH + pOH = 14 at 25°C, pH = 14 - 3 = 11.'
      },
      {
        id: 'c-4',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Coordination Compounds',
        question: 'The IUPAC name of the complex [Co(NH₃)₅(CO₃)]Cl is:',
        options: [
          'Pentaamminecarbonatocobalt(III) chloride',
          'Pentaamminecarbonatocobalt(II) chloride',
          'Carbonatopentaamminecobalt(III) chloride',
          'Pentaamminecobalt(III) carbonate chloride'
        ],
        correctAnswer: 0,
        explanation: 'Ligands are named alphabetically: ammine before carbonato. Oxidation state of Co: x + 5(0) + (-2) + (-1) = 0 => x = +3. Hence: Pentaamminecarbonatocobalt(III) chloride.'
      },
      {
        id: 'c-5',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Organic Chemistry: Aldehydes & Ketones',
        question: 'Which of the following compounds gives a positive Iodoform test upon reaction with I₂ / NaOH?',
        options: [
          'Methanol',
          'Pentan-3-one',
          'Acetophenone (C₆H₅COCH₃)',
          'Benzophenone (C₆H₅COC₆H₅)'
        ],
        correctAnswer: 2,
        explanation: 'The iodoform test is given by compounds having a methyl carbonyl group (CH₃-C=O) or CH₃-CH(OH)- group. Acetophenone contains the CH₃-C=O group and oxidizes to give a yellow precipitate of CHI₃.'
      },
      {
        id: 'c-6',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Solutions',
        question: 'The van \'t Hoff factor (i) for a dilute aqueous solution of BaCl₂ assuming 100% complete dissociation is:',
        options: [
          '1',
          '2',
          '3',
          '4'
        ],
        correctAnswer: 2,
        explanation: 'BaCl₂ dissociates as: BaCl₂ (aq) → Ba²⁺ (aq) + 2 Cl⁻ (aq).\nTotal particles per formula unit = 1 + 2 = 3. Therefore, for 100% dissociation, i = 3.'
      },
      {
        id: 'c-7',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Periodic Properties',
        question: 'Among the following isoelectronic species, which has the smallest ionic radius?\n(N³⁻, O²⁻, F⁻, Na⁺)',
        options: [
          'N³⁻',
          'O²⁻',
          'F⁻',
          'Na⁺'
        ],
        correctAnswer: 3,
        explanation: 'All four species have 10 electrons. As the nuclear charge (atomic number Z) increases, the nucleus pulls the electron cloud closer. Na⁺ (Z = 11) has the highest nuclear charge, so it possesses the smallest ionic radius.'
      },
      {
        id: 'c-8',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Chemical Kinetics',
        question: 'For a first-order chemical reaction, the time required for 99.9% completion is approximately how many times the half-life (t_1/2)?',
        options: [
          '2 times',
          '5 times',
          '10 times',
          '20 times'
        ],
        correctAnswer: 2,
        explanation: 't = (2.303 / k) · log(100 / (100 - 99.9)) = (2.303 / k) · log(1000) = (2.303 / k) · 3.\nt_1/2 = (2.303 / k) · log(2) = (2.303 / k) · 0.3010.\nt_99.9% / t_1/2 = 3 / 0.3010 ≈ 10 times.'
      },
      {
        id: 'c-9',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Biomolecules',
        question: 'Which of the following nitrogenous bases is present in RNA but NOT in DNA?',
        options: [
          'Thymine',
          'Uracil',
          'Cytosine',
          'Guanine'
        ],
        correctAnswer: 1,
        explanation: 'RNA contains Uracil (U) instead of Thymine (T). Adenine, Guanine, and Cytosine are common to both DNA and RNA.'
      },
      {
        id: 'c-10',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Hydrocarbons',
        question: 'When propyne is treated with dilute H₂SO₄ in the presence of HgSO₄ at 60°C, the major product obtained is:',
        options: [
          'Propan-1-ol',
          'Propan-2-one (Acetone)',
          'Propanal',
          'Propanoic acid'
        ],
        correctAnswer: 1,
        explanation: 'Kucherov reaction: Hydration of propyne according to Markovnikov\'s rule gives an enol (CH₃-C(OH)=CH₂), which rapidly tautomerizes to stable propan-2-one (acetone).'
      },
      {
        id: 'c-11',
        subject: 'Chemistry',
        section: 'A',
        topic: 'd and f-Block Elements',
        question: 'Lanthanoid contraction is primarily caused by:',
        options: [
          'Poor shielding of 4f electrons by each other',
          'Effective shielding of 4f electrons',
          'Decreasing nuclear charge across the series',
          'High shielding of 5d electrons'
        ],
        correctAnswer: 0,
        explanation: 'The 4f electrons have diffuse shapes and provide very poor shielding for outer electrons against increasing nuclear charge, causing an unexpected steady decrease in atomic and ionic radii.'
      },
      {
        id: 'c-12',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Electrochemistry',
        question: 'The standard reduction potentials of Zn²⁺/Zn and Cu²⁺/Cu are -0.76 V and +0.34 V respectively. The standard EMF of the Daniel cell (E°_cell) is:',
        options: [
          '+0.42 V',
          '-1.10 V',
          '+1.10 V',
          '-0.42 V'
        ],
        correctAnswer: 2,
        explanation: 'E°_cell = E°_cathode - E°_anode = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = 0.34 V - (-0.76 V) = +1.10 V.'
      },
      {
        id: 'c-13',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Amines',
        question: 'Which test is used to distinguish primary aliphatic/aromatic amines by producing a foul-smelling isocyanide/carbylamine?',
        options: [
          'Lucas Test',
          'Carbylamine Test',
          'Tollens Test',
          'Fehling Test'
        ],
        correctAnswer: 1,
        explanation: 'Carbylamine test (heating 1° amine with CHCl₃ and alc. KOH) produces foul-smelling isocyanides (carbylamines). Secondary and tertiary amines do not show this test.'
      },
      {
        id: 'c-14',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Haloalkanes and Haloarenes',
        question: 'Which alkyl halide undergoes S_N1 reaction at the fastest rate?',
        options: [
          'Methyl bromide',
          'Ethyl bromide',
          'Isopropyl bromide',
          'tert-Butyl bromide'
        ],
        correctAnswer: 3,
        explanation: 'S_N1 reaction rate depends on the stability of the carbocation intermediate. The tertiary carbocation (CH₃)₃C⁺ is stabilized by hyperconjugation (+I effect of 3 methyl groups), making tert-butyl bromide the fastest.'
      },
      {
        id: 'c-15',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Solid State / Basic Concepts',
        question: 'The number of moles of solute present in 1 kg of solvent is defined as:',
        options: [
          'Molarity',
          'Molality',
          'Normality',
          'Mole fraction'
        ],
        correctAnswer: 1,
        explanation: 'Molality (m) is defined as moles of solute divided by mass of solvent in kilograms. It is temperature independent.'
      },

      // ================= CHEMISTRY SECTION B =================
      {
        id: 'c-16',
        subject: 'Chemistry',
        section: 'B',
        topic: 'p-Block Elements',
        question: 'Which oxide of nitrogen is a blue solid at low temperatures and exists as a neutral oxide in gaseous equilibrium?',
        options: [
          'NO',
          'N₂O',
          'N₂O₃',
          'N₂O₅'
        ],
        correctAnswer: 2,
        explanation: 'Dinitrogen trioxide (N₂O₃) is an acidic blue solid at low temperatures. In the liquid/gas state, it dissociates into NO and NO₂.'
      },
      {
        id: 'c-17',
        subject: 'Chemistry',
        section: 'B',
        topic: 'Surface Chemistry',
        question: 'The coagulating power of an electrolyte for an arsenic sulphide (negatively charged) sol follows which Hardy-Schulze order?',
        options: [
          'Al³⁺ > Ba²⁺ > Na⁺',
          'Na⁺ > Ba²⁺ > Al³⁺',
          'PO₄³⁻ > SO₄²⁻ > Cl⁻',
          'Cl⁻ > SO₄²⁻ > PO₄³⁻'
        ],
        correctAnswer: 0,
        explanation: 'According to Hardy-Schulze rule, for a negatively charged sol, coagulation is effected by cations, and higher the valency of the coagulating ion, greater is its coagulating power: Al³⁺ > Ba²⁺ > Na⁺.'
      },
      {
        id: 'c-18',
        subject: 'Chemistry',
        section: 'B',
        topic: 'Organic Chemistry: Reagents',
        question: 'Lucas reagent is an equimolar mixture of:',
        options: [
          'Anhydrous ZnCl₂ + Conc. HCl',
          'Dilute HCl + Zn powder',
          'Conc. HNO₃ + Conc. H₂SO₄',
          'AlCl₃ + CH₃Cl'
        ],
        correctAnswer: 0,
        explanation: 'Lucas reagent is anhydrous zinc chloride (ZnCl₂) dissolved in concentrated hydrochloric acid (HCl), used to differentiate 1°, 2°, and 3° alcohols based on turbidity appearance time.'
      },
      {
        id: 'c-19',
        subject: 'Chemistry',
        section: 'B',
        topic: 'General Principles of Metallurgy',
        question: 'Froth floatation process is predominantly employed for the concentration of which class of ores?',
        options: [
          'Oxide ores',
          'Sulphide ores',
          'Carbonate ores',
          'Halide ores'
        ],
        correctAnswer: 1,
        explanation: 'Froth floatation relies on the preferential wetting of sulphide ore particles by pine oil / collectors and gangue particles by water.'
      },
      {
        id: 'c-20',
        subject: 'Chemistry',
        section: 'B',
        topic: 'Atomic Structure',
        question: 'The maximum number of electrons that can be accommodated in a subshell with azimuthal quantum number l = 3 is:',
        options: [
          '6',
          '10',
          '14',
          '18'
        ],
        correctAnswer: 2,
        explanation: 'For azimuthal quantum number l = 3 (f-subshell), number of orbitals = 2l + 1 = 2(3) + 1 = 7. Each orbital holds 2 electrons with opposite spins, so maximum electrons = 2 × 7 = 14.'
      },

      // ================= BOTANY SECTION A =================
      {
        id: 'b-1',
        subject: 'Botany',
        section: 'A',
        topic: 'Cell Biology & Cell Cycle',
        question: 'Recombination nodules and crossing over between non-sister chromatids of homologous chromosomes occur during which stage of Prophase I of Meiosis?',
        options: [
          'Leptotene',
          'Zygotene',
          'Pachytene',
          'Diplotene'
        ],
        correctAnswer: 2,
        explanation: 'Crossing over is an enzyme-mediated process (catalyzed by recombinase) that occurs specifically during the Pachytene stage of Prophase I, characterized by appearance of recombination nodules (NCERT Class 11).'
      },
      {
        id: 'b-2',
        subject: 'Botany',
        section: 'A',
        topic: 'Genetics: Molecular Basis of Inheritance',
        question: 'Which of the following codons acts as the dual-purpose initiator codon and codes for methionine in eukaryotes?',
        options: [
          'UAA',
          'UAG',
          'AUG',
          'UGA'
        ],
        correctAnswer: 2,
        explanation: 'AUG has dual functions: it acts as the initiation codon for translation and codes for the amino acid Methionine (Met).'
      },
      {
        id: 'b-3',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Physiology: Photosynthesis',
        question: 'In C₄ plants, the primary carbon dioxide acceptor is a 3-carbon molecule called:',
        options: [
          'Ribulose-1,5-bisphosphate (RuBP)',
          'Phosphoenolpyruvate (PEP)',
          'Oxaloacetic acid (OAA)',
          'Phosphoglyceric acid (PGA)'
        ],
        correctAnswer: 1,
        explanation: 'In the mesophyll cells of C₄ plants, the primary CO₂ acceptor is PEP (Phosphoenolpyruvate, 3-carbon) and the reaction is catalyzed by PEP carboxylase (PEPcase).'
      },
      {
        id: 'b-4',
        subject: 'Botany',
        section: 'A',
        topic: 'Sexual Reproduction in Flowering Plants',
        question: 'The functional megaspore in a typical angiosperm develops into an embryo sac that at maturity is:',
        options: [
          '8-celled and 8-nucleate',
          '7-celled and 8-nucleate',
          '8-celled and 7-nucleate',
          '7-celled and 7-nucleate'
        ],
        correctAnswer: 1,
        explanation: 'A typical angiosperm embryo sac (Polygonum type) at maturity consists of 7 cells (3 antipodals, 2 synergids, 1 egg cell, and 1 large central cell with 2 polar nuclei) and 8 nuclei.'
      },
      {
        id: 'b-5',
        subject: 'Botany',
        section: 'A',
        topic: 'Principles of Inheritance and Variation',
        question: 'In a dihybrid cross involving two genes following independent assortment, what is the phenotypic ratio obtained in the F₂ generation?',
        options: [
          '9 : 3 : 3 : 1',
          '1 : 2 : 1',
          '3 : 1',
          '9 : 7'
        ],
        correctAnswer: 0,
        explanation: 'Mendel\'s dihybrid cross phenotypic ratio in F₂ generation is 9:3:3:1 (dominant for both : dominant for first, recessive for second : recessive for first, dominant for second : recessive for both).'
      },
      {
        id: 'b-6',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Physiology: Respiration in Plants',
        question: 'What is the net gain of ATP molecules produced directly during the complete conversion of one glucose molecule into two pyruvate molecules via Glycolysis?',
        options: [
          '2 ATP',
          '4 ATP',
          '8 ATP',
          '36 ATP'
        ],
        correctAnswer: 0,
        explanation: 'In glycolysis, 4 ATP are generated by substrate-level phosphorylation and 2 ATP are consumed in the preparatory phase, resulting in a net direct gain of 2 ATP.'
      },
      {
        id: 'b-7',
        subject: 'Botany',
        section: 'A',
        topic: 'Ecology & Environment',
        question: 'According to Robert May’s global estimates, the total number of species currently existing on Earth is approximately:',
        options: [
          '1.5 million',
          '7 million',
          '20 to 50 million',
          '100 million'
        ],
        correctAnswer: 1,
        explanation: 'Robert May places the global species diversity at approximately 7 million (NCERT Class 12, Chapter 15 Biodiversity and Conservation).'
      },
      {
        id: 'b-8',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Growth & Development',
        question: 'Which phytohormone is widely called the stress hormone as it stimulates the closure of stomata during water deficit?',
        options: [
          'Auxin',
          'Gibberellin',
          'Abscisic Acid (ABA)',
          'Cytokinin'
        ],
        correctAnswer: 2,
        explanation: 'Abscisic acid (ABA) stimulates the closure of stomata under water stress and increases plant tolerance to various kinds of stresses, earning the name "stress hormone".'
      },
      {
        id: 'b-9',
        subject: 'Botany',
        section: 'A',
        topic: 'Anatomy of Flowering Plants',
        question: 'Casparian strips containing suberin depositions are typically found in which layer of the plant root?',
        options: [
          'Epidermis',
          'Endodermis',
          'Pericycle',
          'Cortex'
        ],
        correctAnswer: 1,
        explanation: 'The tangential as well as radial walls of the endodermal cells have a deposition of water-impermeable, waxy material suberin in the form of Casparian strips.'
      },
      {
        id: 'b-10',
        subject: 'Botany',
        section: 'A',
        topic: 'Biological Classification',
        question: 'Viroids differ from viruses in having:',
        options: [
          'DNA molecules with protein coat',
          'RNA molecules with protein coat',
          'RNA molecules without protein coat',
          'DNA molecules without protein coat'
        ],
        correctAnswer: 2,
        explanation: 'Discovered by T.O. Diener in 1971, viroids are free infectious RNA molecules of low molecular weight that lack the protective protein capsid found in viruses.'
      },
      {
        id: 'b-11',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Kingdom',
        question: 'Which of the following is considered an amphibian of the plant kingdom because it requires water for sexual reproduction (fertilization)?',
        options: [
          'Algae',
          'Bryophytes',
          'Gymnosperms',
          'Angiosperms'
        ],
        correctAnswer: 1,
        explanation: 'Bryophytes are called amphibians of the plant kingdom because these plants can live in soil but are dependent on water for sexual reproduction (flagellated antherozoids swim to archegonia).'
      },
      {
        id: 'b-12',
        subject: 'Botany',
        section: 'A',
        topic: 'Morphology of Flowering Plants',
        question: 'Pneumatophores (respiratory roots) that emerge vertically upwards above the mud surface are found in:',
        options: [
          'Rhizophora',
          'Banyan tree',
          'Maize',
          'Pistia'
        ],
        correctAnswer: 0,
        explanation: 'In plants growing in swampy/mangrove areas like Rhizophora, numerous roots come out of the ground vertically upwards called pneumatophores to obtain oxygen for respiration.'
      },
      {
        id: 'b-13',
        subject: 'Botany',
        section: 'A',
        topic: 'Ecosystem',
        question: 'Which ecosystem among the following is characterized by having an inverted pyramid of biomass?',
        options: [
          'Forest ecosystem',
          'Grassland ecosystem',
          'Sea / Pond aquatic ecosystem',
          'Desert ecosystem'
        ],
        correctAnswer: 2,
        explanation: 'The pyramid of biomass in sea/ocean is generally inverted because the biomass of primary producers (phytoplankton) at any instant is far less than that of consumer fishes.'
      },
      {
        id: 'b-14',
        subject: 'Botany',
        section: 'A',
        topic: 'Molecular Basis of Inheritance',
        question: 'In Meselson and Stahl\'s experiment proving semi-conservative DNA replication, which isotope was used as the nitrogen source?',
        options: [
          '¹⁴C and ¹²C',
          '¹⁵N and ¹⁴N',
          '³²P and ³⁵S',
          '³H (Tritiated thymidine)'
        ],
        correctAnswer: 1,
        explanation: 'Meselson and Stahl grew E. coli in a medium containing ¹⁵NH₄Cl (heavy isotope of nitrogen) and then shifted it to a normal ¹⁴NH₄Cl medium, separating DNA by CsCl density gradient centrifugation.'
      },
      {
        id: 'b-15',
        subject: 'Botany',
        section: 'A',
        topic: 'Cell Biology: Organelles',
        question: 'Which cell organelle is known as the "site of formation of glycoproteins and glycolipids" (glycosylation)?',
        options: [
          'Golgi apparatus',
          'Lysosome',
          'Peroxisome',
          'Rough Endoplasmic Reticulum'
        ],
        correctAnswer: 0,
        explanation: 'The Golgi apparatus is the primary site for chemical modification, packaging, and sorting of proteins and lipids, notably glycosylation to synthesize glycoproteins and glycolipids.'
      },

      // ================= BOTANY SECTION B =================
      {
        id: 'b-16',
        subject: 'Botany',
        section: 'B',
        topic: 'Plant Physiology: Transport in Plants',
        question: 'According to the pressure flow hypothesis, phloem loading at the source is an:',
        options: [
          'Active process requiring ATP',
          'Purely passive diffusion process',
          'Osmotic balance without energy',
          'Facilitated diffusion through aquaporins'
        ],
        correctAnswer: 0,
        explanation: 'Sucrose is actively transported into companion cells and then into sieve tube elements at the source, creating a hypertonic condition that draws water by osmosis (active phloem loading).'
      },
      {
        id: 'b-17',
        subject: 'Botany',
        section: 'B',
        topic: 'Microbes in Human Welfare',
        question: 'Which mycorrhizal fungus genus forms endomycorrhiza and helps plants absorb phosphorus from soil?',
        options: [
          'Glomus',
          'Rhizobium',
          'Azotobacter',
          'Trichoderma'
        ],
        correctAnswer: 0,
        explanation: 'Many members of the genus Glomus form mycorrhizae (symbiotic fungal association). The fungal symbiont absorbs phosphorus from soil and passes it to the plant.'
      },
      {
        id: 'b-18',
        subject: 'Botany',
        section: 'B',
        topic: 'Genetics: Chromosomal Disorders',
        question: 'A human female suffering from Turner’s syndrome has which of the following sex chromosome karyotypes?',
        options: [
          '47, XXY',
          '45, X0',
          '47, XYY',
          '47, XXX'
        ],
        correctAnswer: 1,
        explanation: 'Turner’s syndrome is caused by the absence of one of the X chromosomes, resulting in a 45, X0 karyotype. Such females are sterile as ovaries are rudimentary.'
      },
      {
        id: 'b-19',
        subject: 'Botany',
        section: 'B',
        topic: 'Ecology: Population Growth',
        question: 'In the logistic growth curve equation dN/dt = rN((K - N)/K), the term (K - N)/K represents:',
        options: [
          'Biotic potential',
          'Environmental resistance / carrying capacity constraint',
          'Intrinsic rate of natural increase',
          'Total population saturation'
        ],
        correctAnswer: 1,
        explanation: 'K represents carrying capacity. As population N approaches K, the term (K - N)/K approaches zero, symbolizing environmental resistance.'
      },
      {
        id: 'b-20',
        subject: 'Botany',
        section: 'B',
        topic: 'Plant Reproduction',
        question: 'Apomixis is a form of reproduction that:',
        options: [
          'Mimics sexual reproduction without fertilization',
          'Involves fusion of two gametes',
          'Occurs only through vegetative propagation of stems',
          'Produces sterile seeds'
        ],
        correctAnswer: 0,
        explanation: 'Apomixis is a special mechanism in some angiosperms (Asteraceae and grasses) to produce seeds without fertilization, effectively mimicking sexual reproduction while preserving hybrid vigor.'
      },

      // ================= ZOOLOGY SECTION A =================
      {
        id: 'z-1',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Physiology: Circulation',
        question: 'In the cardiac cycle, the "LUB" first heart sound is produced by the simultaneous closure of which valves?',
        options: [
          'Aortic and pulmonary semilunar valves',
          'Tricuspid and bicuspid (mitral) atrioventricular valves',
          'Only tricuspid valve',
          'Closure of Eustachian valve'
        ],
        correctAnswer: 1,
        explanation: 'The first heart sound (lub) is associated with the closure of the tricuspid and bicuspid (mitral) AV valves at the onset of ventricular systole.'
      },
      {
        id: 'z-2',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Reproduction',
        question: 'The hormone responsible for triggering ovulation and maintenance of the corpus luteum in females is:',
        options: [
          'FSH (Follicle Stimulating Hormone)',
          'LH (Luteinizing Hormone)',
          'Prolactin',
          'Oxytocin'
        ],
        correctAnswer: 1,
        explanation: 'A rapid mid-cycle surge of Luteinizing Hormone (LH surge) induces the rupture of the Graafian follicle and release of the ovum (ovulation) and converts ruptured follicle into corpus luteum.'
      },
      {
        id: 'z-3',
        subject: 'Zoology',
        section: 'A',
        topic: 'Chemical Coordination & Integration',
        question: 'Deficiency of which hormone causes Diabetes Insipidus characterized by excessive loss of water in urine?',
        options: [
          'Insulin',
          'Vasopressin (Anti-diuretic Hormone / ADH)',
          'Glucagon',
          'Aldosterone'
        ],
        correctAnswer: 1,
        explanation: 'Hyposecretion of Vasopressin/ADH from the posterior pituitary leads to impaired water reabsorption by renal distal tubules, resulting in loss of water (diuresis) called Diabetes Insipidus.'
      },
      {
        id: 'z-4',
        subject: 'Zoology',
        section: 'A',
        topic: 'Biotechnology: Principles & Processes',
        question: 'In recombinant DNA technology, the enzyme used to cut DNA at specific palindromic recognition sequences is:',
        options: [
          'DNA Ligase',
          'Restriction Endonuclease',
          'DNA Polymerase I',
          'Alkaline Phosphatase'
        ],
        correctAnswer: 1,
        explanation: 'Restriction endonucleases (molecular scissors) inspect the DNA sequence and make cuts at specific palindromic nucleotide recognition sites.'
      },
      {
        id: 'z-5',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Physiology: Excretion',
        question: 'The Renin-Angiotensin-Aldosterone System (RAAS) is initiated when a fall in glomerular blood flow triggers juxtaglomerular (JG) cells to release:',
        options: [
          'Angiotensinogen',
          'Renin',
          'Aldosterone',
          'ANF (Atrial Natriuretic Factor)'
        ],
        correctAnswer: 1,
        explanation: 'A fall in GFR activates juxtaglomerular cells to secrete the enzyme Renin, which converts angiotensinogen in blood to angiotensin I and subsequently angiotensin II.'
      },
      {
        id: 'z-6',
        subject: 'Zoology',
        section: 'A',
        topic: 'Evolution',
        question: 'Analogous organs are formed as a result of:',
        options: [
          'Divergent evolution',
          'Convergent evolution',
          'Parallel speciation',
          'Genetic drift'
        ],
        correctAnswer: 1,
        explanation: 'Analogous structures are not anatomically similar but perform similar functions due to adaptation to similar ecological needs (convergent evolution, e.g., wings of butterfly and birds).'
      },
      {
        id: 'z-7',
        subject: 'Zoology',
        section: 'A',
        topic: 'Animal Kingdom',
        question: 'Which of the following animals exhibits bilateral symmetry, triploblastic organization, and a true coelom with metameric segmentation?',
        options: [
          'Taenia solium (Tapeworm)',
          'Ascaris (Roundworm)',
          'Pheretima (Earthworm / Annelida)',
          'Sycon (Sponges)'
        ],
        correctAnswer: 2,
        explanation: 'Annelids like Pheretima (earthworm) are triploblastic, bilaterally symmetrical, coelomate invertebrates exhibiting true metameric segmentation.'
      },
      {
        id: 'z-8',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Physiology: Neural Control',
        question: 'Resting membrane potential in an axon is primarily maintained by:',
        options: [
          'Passive leakage of Ca²⁺',
          'Sodium-potassium pump (3 Na⁺ pumped out for 2 K⁺ pumped in)',
          'Voltage-gated chlorine channels',
          'Inward diffusion of Na⁺'
        ],
        correctAnswer: 1,
        explanation: 'The Na⁺/K⁺ ATPase pump actively transports 3 Na⁺ outwards for 2 K⁺ inwards per ATP hydrolyzed, maintaining the negative resting inside potential (-70 mV).'
      },
      {
        id: 'z-9',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Health & Disease',
        question: 'The antibody present in highest concentration in human colostrum (initial mother’s milk) providing passive immunity to infants is:',
        options: [
          'IgG',
          'IgM',
          'IgA',
          'IgE'
        ],
        correctAnswer: 2,
        explanation: 'Colostrum is rich in IgA antibodies (dimeric IgA with secretory component) which protects the newborn against intestinal and mucosal pathogens.'
      },
      {
        id: 'z-10',
        subject: 'Zoology',
        section: 'A',
        topic: 'Biotechnology & its Applications',
        question: 'Bt-cotton plants resist lepidopteran insect pests because the insect gut provides:',
        options: [
          'Acidic pH that activates inactive protoxin',
          'Alkaline pH that solubilizes and activates inactive crystalline protoxin',
          'Enzymes that break down cellulose',
          'High temperature inside insect body'
        ],
        correctAnswer: 1,
        explanation: 'The inactive Bt crystalline protoxin is converted into an active toxin due to the alkaline pH of the insect midgut, which creates pores in epithelial cells causing swelling and death.'
      },
      {
        id: 'z-11',
        subject: 'Zoology',
        section: 'A',
        topic: 'Reproductive Health',
        question: 'Which of the following is a non-steroidal oral contraceptive pill developed by the Central Drug Research Institute (CDRI), Lucknow?',
        options: [
          'Mala-D',
          'Saheli (Centchroman)',
          'Norplant',
          'Depo-Provera'
        ],
        correctAnswer: 1,
        explanation: 'Saheli (centchroman) is a "once-a-week" non-steroidal oral contraceptive pill with very few side effects, developed by scientists at CDRI Lucknow.'
      },
      {
        id: 'z-12',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Physiology: Breathing & Respiration',
        question: 'Approximately what percentage of carbon dioxide is transported in blood in the form of bicarbonate ions (HCO₃⁻)?',
        options: [
          '7%',
          '20-25%',
          '70%',
          '97%'
        ],
        correctAnswer: 2,
        explanation: 'Approximately 70% of CO₂ is carried as bicarbonate ions (HCO₃⁻) catalyzed by carbonic anhydrase in RBCs; 20-25% as carbaminohemoglobin and 7% dissolved in plasma.'
      },
      {
        id: 'z-13',
        subject: 'Zoology',
        section: 'A',
        topic: 'Structural Organisation in Animals',
        question: 'The type of epithelial tissue that forms the inner lining of blood vessels and lung alveoli to facilitate rapid diffusion is:',
        options: [
          'Simple squamous epithelium',
          'Ciliated columnar epithelium',
          'Cuboidal epithelium',
          'Transitional epithelium'
        ],
        correctAnswer: 0,
        explanation: 'Simple squamous epithelium (endothelium / alveolar wall) consists of a single thin layer of flattened cells with irregular boundaries, ideal for diffusion of gases and liquids.'
      },
      {
        id: 'z-14',
        subject: 'Zoology',
        section: 'A',
        topic: 'Locomotion and Movement',
        question: 'According to the sliding filament theory of muscle contraction, during the contraction of a sarcomere:',
        options: [
          'A-band shortens',
          'I-band and H-zone shorten while A-band remains constant in length',
          'Both A-band and I-band lengthen',
          'Actin filaments shorten in length'
        ],
        correctAnswer: 1,
        explanation: 'During muscle contraction, thin actin filaments slide into the H-zone towards the M-line; the \'I\' bands shorten, the \'H\' zone narrows or disappears, while the \'A\' bands retain their length.'
      },
      {
        id: 'z-15',
        subject: 'Zoology',
        section: 'A',
        topic: 'Biomolecules in Animals',
        question: 'An example of a competitive enzyme inhibitor used therapeutically is malonate, which inhibits:',
        options: [
          'Succinate dehydrogenase',
          'Carbonic anhydrase',
          'Hexokinase',
          'DNA Polymerase'
        ],
        correctAnswer: 0,
        explanation: 'Malonate closely resembles the substrate succinate in structure and competitively binds to the active site of succinate dehydrogenase, stopping the citric acid cycle step.'
      },

      // ================= ZOOLOGY SECTION B =================
      {
        id: 'z-16',
        subject: 'Zoology',
        section: 'B',
        topic: 'Human Health & Disease',
        question: 'Which causative agent is responsible for malignant tertian malaria, known to cause cerebral malaria and often prove fatal?',
        options: [
          'Plasmodium vivax',
          'Plasmodium malariae',
          'Plasmodium falciparum',
          'Plasmodium ovale'
        ],
        correctAnswer: 2,
        explanation: 'Malignant malaria caused by Plasmodium falciparum is the most serious and can even be fatal (cerebral malaria with capillary blockage).'
      },
      {
        id: 'z-17',
        subject: 'Zoology',
        section: 'B',
        topic: 'Biotechnology Applications',
        question: 'In ADA (Adenosine Deaminase) deficiency, the primary affected system in the patient’s body is the:',
        options: [
          'Digestive system',
          'Immune system (SCID)',
          'Nervous system',
          'Musculoskeletal system'
        ],
        correctAnswer: 1,
        explanation: 'Adenosine deaminase enzyme is crucial for the proliferation and survival of lymphocytes. Its genetic absence causes Severe Combined Immunodeficiency (SCID).'
      },
      {
        id: 'z-18',
        subject: 'Zoology',
        section: 'B',
        topic: 'Reproductive Health: ART',
        question: 'In an Assisted Reproductive Technology (ART) procedure where embryo transfer is carried out at the 8-blastomere stage into the fallopian tube, the technique is designated as:',
        options: [
          'ZIFT (Zygote Intra-Fallopian Transfer)',
          'IUT (Intra-Uterine Transfer)',
          'GIFT (Gamete Intra-Fallopian Transfer)',
          'ICSI (Intra-Cytoplasmic Sperm Injection)'
        ],
        correctAnswer: 0,
        explanation: 'In IVF-ET: transfer of zygote or early embryo up to 8 blastomeres into the fallopian tube is termed ZIFT. Embryos with more than 8 blastomeres are transferred into uterus (IUT).'
      },
      {
        id: 'z-19',
        subject: 'Zoology',
        section: 'B',
        topic: 'Animal Kingdom: Phylum Chordata',
        question: 'Which of the following is a living jawless fish (cyclostome) that migrates to fresh water for spawning and dies within a few days?',
        options: [
          'Petromyzon (Lamprey)',
          'Scoliodon (Dogfish)',
          'Pristis (Sawfish)',
          'Exocoetus (Flying fish)'
        ],
        correctAnswer: 0,
        explanation: 'Cyclostomes like Petromyzon (Lamprey) are marine but migrate for spawning to fresh water (anadromous migration). After spawning, within a few days, they die and their larvae return to the ocean after metamorphosis.'
      },
      {
        id: 'z-20',
        subject: 'Zoology',
        section: 'B',
        topic: 'Evolution: Hardy-Weinberg',
        question: 'In a population at Hardy-Weinberg equilibrium, if the frequency of the recessive allele \'a\' is 0.4, the frequency of heterozygous individuals (Aa) in the population is:',
        options: [
          '0.16',
          '0.36',
          '0.48',
          '0.24'
        ],
        correctAnswer: 2,
        explanation: 'Given q = 0.4. Since p + q = 1, p = 1 - 0.4 = 0.6.\nThe frequency of heterozygotes is 2pq = 2 · (0.6) · (0.4) = 0.48 (48%).'
      }
    ]
  },
  {
    id: 'neet-bio-booster',
    title: 'Biology 360/360 Sprint Booster',
    subtitle: 'Botany & Zoology High-Yield NCERT Line-by-Line Mock',
    category: 'Subject Mock',
    durationMinutes: 60,
    totalMarks: 360,
    passingMarks: 320,
    difficulty: 'Moderate',
    tags: ['Biology Only', 'NCERT Lines', '360 Marks', 'Speed Drill'],
    description: 'Designed to solidify NCERT line-by-line memory for both Botany and Zoology. Perfect for scoring 340+ in NEET Biology.',
    sections: [
      { id: 'botany-a', name: 'Botany Section', subject: 'Botany', section: 'A', totalQuestions: 15, maxAttempts: 15 },
      { id: 'zoology-a', name: 'Zoology Section', subject: 'Zoology', section: 'A', totalQuestions: 15, maxAttempts: 15 }
    ],
    questions: [
      {
        id: 'bio-1',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Anatomy',
        question: 'The water impermeable waxy deposition of suberin on the radial and tangential walls of endodermal cells is called:',
        options: ['Plasmodesmata', 'Casparian strip', 'Tyloses', 'Lenticels'],
        correctAnswer: 1,
        explanation: 'Casparian strip is a band of cell wall material deposited in the radial and transverse walls of the endodermis, chemically different from the rest of the cell wall.'
      },
      {
        id: 'bio-2',
        subject: 'Botany',
        section: 'A',
        topic: 'Cell Biology',
        question: 'Which of the following cellular structures is NOT bounded by a membrane?',
        options: ['Centriole', 'Peroxisome', 'Lysosome', 'Vacuole'],
        correctAnswer: 0,
        explanation: 'Centrioles, ribosomes, and nucleolus are non-membrane bound organelles found in cells.'
      },
      {
        id: 'bio-3',
        subject: 'Botany',
        section: 'A',
        topic: 'Photosynthesis',
        question: 'The enzyme RuBisCO has an active site that can bind to both CO₂ and O₂. Photorespiration occurs when RuBisCO binds to:',
        options: ['CO₂ at low temperature', 'O₂ at high O₂/CO₂ ratio', 'Water molecules', 'Phosphoglycolate directly'],
        correctAnswer: 1,
        explanation: 'Under high light intensity, high temperature, and high oxygen concentration, RuBisCO acts as an oxygenase, converting RuBP to one molecule of 3-PGA and one of 2-phosphoglycolate (photorespiration).'
      },
      {
        id: 'bio-4',
        subject: 'Botany',
        section: 'A',
        topic: 'Genetics',
        question: 'If a double stranded DNA has 20% Cytosine, what will be the percentage of Adenine according to Chargaff’s rule?',
        options: ['20%', '30%', '40%', '60%'],
        correctAnswer: 1,
        explanation: 'According to Chargaff\'s rule: %G = %C = 20%. Together G + C = 40%. The remaining 60% must be A + T, hence %A = %T = 60/2 = 30%.'
      },
      {
        id: 'bio-5',
        subject: 'Botany',
        section: 'A',
        topic: 'Plant Growth',
        question: 'Which hormone promotes bolting (internode elongation just prior to flowering) in rosette plants like beet and cabbage?',
        options: ['Ethylene', 'Gibberellin', 'Abscisic acid', 'Cytokinin'],
        correctAnswer: 1,
        explanation: 'Gibberellins (GA₃) promote bolting (internode elongation) just prior to flowering in plants with rosette habit like cabbage and beet.'
      },
      {
        id: 'bio-6',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Digestion & Enzymes',
        question: 'Which pro-enzyme in the stomach gastric juice is converted into its active proteolytic form by hydrochloric acid (HCl)?',
        options: ['Trypsinogen', 'Pepsinogen', 'Procarboxypeptidase', 'Chymotrypsinogen'],
        correctAnswer: 1,
        explanation: 'Pepsinogen is an inactive pro-enzyme secreted by peptic/chief cells that is activated to pepsin upon exposure to hydrochloric acid.'
      },
      {
        id: 'bio-7',
        subject: 'Zoology',
        section: 'A',
        topic: 'Immune System',
        question: 'Humoral immunity in humans is primarily mediated by which category of lymphocytes?',
        options: ['T-helper cells', 'B-lymphocytes', 'Cytotoxic T-cells', 'Natural Killer cells'],
        correctAnswer: 1,
        explanation: 'B-lymphocytes produce antibodies that circulate in blood and lymph (body humors), mediating the humoral/antibody-mediated immune response.'
      },
      {
        id: 'bio-8',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Excretion',
        question: 'Which segment of the nephron is completely impermeable to water but allows active or passive transport of electrolytes?',
        options: ['Descending limb of loop of Henle', 'Ascending limb of loop of Henle', 'Proximal Convoluted Tubule', 'Glomerular capsule'],
        correctAnswer: 1,
        explanation: 'The descending limb is permeable to water and almost impermeable to electrolytes. In contrast, the ascending limb is impermeable to water and permeable to electrolytes.'
      },
      {
        id: 'bio-9',
        subject: 'Zoology',
        section: 'A',
        topic: 'Endocrine System',
        question: 'Which of the following is an emergency hormone secreted by the adrenal medulla during "fight or flight" situations?',
        options: ['Adrenaline (Epinephrine)', 'Calcitonin', 'Melatonin', 'Thymosin'],
        correctAnswer: 0,
        explanation: 'Adrenaline and noradrenaline are catecholamines secreted by the adrenal medulla in response to stress and emergencies, increasing heart rate, alertness, and blood glucose.'
      },
      {
        id: 'bio-10',
        subject: 'Zoology',
        section: 'A',
        topic: 'Human Reproduction',
        question: 'The primary function of Sertoli cells located in the seminiferous tubules of testes is to:',
        options: ['Produce testosterone', 'Provide nutrition and support to developing spermatids', 'Secrete LH', 'Form the acrosome of sperm'],
        correctAnswer: 1,
        explanation: 'Sertoli cells (nurse cells) provide structural and nutritional support to developing germ cells / spermatids during spermatogenesis.'
      }
    ]
  },
  {
    id: 'neet-physics-chem-sprint',
    title: 'Physics & Chemistry Speed Sprint',
    subtitle: 'High-Yield Formulae, Numericals & NCERT Concept Drill',
    category: 'Subject Mock',
    durationMinutes: 45,
    totalMarks: 160,
    passingMarks: 110,
    difficulty: 'Moderate',
    tags: ['Physics + Chem', 'High Weightage', 'Time Management'],
    description: 'Designed to conquer fear of numericals and speed calculation in Physics and Chemistry for NEET 2026/2027.',
    sections: [
      { id: 'phy-sec', name: 'Physics Section', subject: 'Physics', section: 'A', totalQuestions: 5, maxAttempts: 5 },
      { id: 'chem-sec', name: 'Chemistry Section', subject: 'Chemistry', section: 'A', totalQuestions: 5, maxAttempts: 5 }
    ],
    questions: [
      {
        id: 'pc-1',
        subject: 'Physics',
        section: 'A',
        topic: 'Kinematics',
        question: 'A projectile is fired with an initial velocity of 40 m/s at an angle of 30° with the horizontal. The maximum height reached is (g = 10 m/s²):',
        options: ['20 m', '40 m', '80 m', '10 m'],
        correctAnswer: 0,
        explanation: 'H_max = (u² sin² θ) / (2g) = (40² · sin² 30°) / (2 · 10) = (1600 · 0.25) / 20 = 400 / 20 = 20 m.'
      },
      {
        id: 'pc-2',
        subject: 'Physics',
        section: 'A',
        topic: 'Current Electricity',
        question: 'A wire of resistance R is stretched uniformly to double its original length. The new resistance of the wire will be:',
        options: ['2R', '4R', 'R/2', 'R/4'],
        correctAnswer: 1,
        explanation: 'Volume is constant: V = A · L = constant. If length is doubled (L\' = 2L), area becomes half (A\' = A/2). Since R = ρL/A, R\' = ρ(2L)/(A/2) = 4(ρL/A) = 4R.'
      },
      {
        id: 'pc-3',
        subject: 'Physics',
        section: 'A',
        topic: 'Photoelectric Effect',
        question: 'When light of frequency 2ν₀ (where ν₀ is threshold frequency) is incident on a metal, the maximum kinetic energy of emitted photoelectrons is:',
        options: ['hν₀', '2hν₀', '3hν₀', 'Zero'],
        correctAnswer: 0,
        explanation: 'Einstein\'s photoelectric equation: KE_max = hν - hν₀. With ν = 2ν₀: KE_max = h(2ν₀) - hν₀ = hν₀.'
      },
      {
        id: 'pc-4',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Solutions',
        question: 'What is the molality of an aqueous solution containing 18 g of glucose (molar mass = 180 g/mol) dissolved in 500 g of water?',
        options: ['0.1 m', '0.2 m', '0.5 m', '1.0 m'],
        correctAnswer: 1,
        explanation: 'Moles of glucose = 18 / 180 = 0.1 mol. Mass of water = 500 g = 0.5 kg. Molality m = 0.1 / 0.5 = 0.2 mol/kg (0.2 m).'
      },
      {
        id: 'pc-5',
        subject: 'Chemistry',
        section: 'A',
        topic: 'Organic Chemistry',
        question: 'Which of the following carbocations is the MOST stable?',
        options: ['(CH₃)₃C⁺ (tert-butyl)', '(CH₃)₂CH⁺ (isopropyl)', 'CH₃CH₂⁺ (ethyl)', 'CH₃⁺ (methyl)'],
        correctAnswer: 0,
        explanation: 'The tert-butyl carbocation has 9 alpha-hydrogens providing maximum hyperconjugative stability, plus inductive +I electron donation from three methyl groups.'
      }
    ]
  }
];

// Romantic & motivational quotes for his girlfriend preparing for NEET
export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Stethoscope fits you better than anyone else. Keep going, future Dr. Sahiba! 🩺✨",
    author: "With all my love & support"
  },
  {
    quote: "Every question you practice today brings that white coat one step closer to reality. 🤍",
    author: "Mission AIIMS & Govt Medical College"
  },
  {
    quote: "Physics numericals might be stubborn, but you are 100x stronger! You've got this.",
    author: "Daily Reminder"
  },
  {
    quote: "720 marks is just a number. Your dedication, hard work and compassion will make you an extraordinary doctor.",
    author: "Always Proud of You"
  },
  {
    quote: "Mistakes are just lessons in disguise. Analyze them, breathe, and conquer the next test! 💪",
    author: "NEET Companion"
  }
];
