/* ============================================================
   Professions catalogue - 200+ trade professions with
   trade-specific pricing questions for setup wizard.
   Exposed as window.Professions
   ============================================================ */
(function () {
  "use strict";

  var PROFESSIONS = [
  {
    "id": "carpet-fitter",
    "name": "Carpet Fitter",
    "category": "Flooring",
    "questions": [
      {
        "key": "carpet_budget_m2",
        "label": "Budget carpet",
        "type": "number",
        "unit": "per m2",
        "default": 9
      },
      {
        "key": "carpet_mid_m2",
        "label": "Mid-range carpet",
        "type": "number",
        "unit": "per m2",
        "default": 13
      },
      {
        "key": "carpet_premium_m2",
        "label": "Premium carpet",
        "type": "number",
        "unit": "per m2",
        "default": 18
      },
      {
        "key": "vinyl_m2",
        "label": "Vinyl flooring",
        "type": "number",
        "unit": "per m2",
        "default": 15
      },
      {
        "key": "laminate_m2",
        "label": "Laminate flooring",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "engineered_wood_m2",
        "label": "Engineered wood",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "underlay_m2",
        "label": "Underlay",
        "type": "number",
        "unit": "per m2",
        "default": 4
      },
      {
        "key": "gripper_m",
        "label": "Gripper rod",
        "type": "number",
        "unit": "per m",
        "default": 1.2
      },
      {
        "key": "door_bar",
        "label": "Door bar",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "uplift_m2",
        "label": "Uplift & disposal",
        "type": "number",
        "unit": "per m2",
        "default": 3
      },
      {
        "key": "fitting_m2",
        "label": "Fitting labour",
        "type": "number",
        "unit": "per m2",
        "default": 5
      },
      {
        "key": "stairs_step",
        "label": "Stairs (per step)",
        "type": "number",
        "unit": "per step",
        "default": 25
      },
      {
        "key": "roll_width",
        "label": "Roll width",
        "type": "select",
        "unit": "metres",
        "options": [
          "4",
          "5"
        ],
        "default": "4"
      }
    ]
  },
  {
    "id": "plasterer",
    "name": "Plasterer",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "board_type",
        "label": "Plasterboard type",
        "type": "select",
        "unit": "",
        "options": [
          "Standard",
          "Fire rated",
          "Moisture resistant",
          "Soundboard"
        ],
        "default": "Standard"
      },
      {
        "key": "board_thickness",
        "label": "Board thickness",
        "type": "select",
        "unit": "mm",
        "options": [
          "9.5",
          "12.5",
          "15"
        ],
        "default": "12.5"
      },
      {
        "key": "skim_m2",
        "label": "Skim coat",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "dry_lining_dotdab_m2",
        "label": "Dry lining (dot & dab)",
        "type": "number",
        "unit": "per m2",
        "default": 18
      },
      {
        "key": "dry_lining_stud_m2",
        "label": "Dry lining (stud wall)",
        "type": "number",
        "unit": "per m2",
        "default": 22
      },
      {
        "key": "coving_m",
        "label": "Coving",
        "type": "number",
        "unit": "per m",
        "default": 5
      },
      {
        "key": "labour_day",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      },
      {
        "key": "labour_m2",
        "label": "Labour rate",
        "type": "number",
        "unit": "per m2",
        "default": 8
      }
    ]
  },
  {
    "id": "electrician",
    "name": "Electrician",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "cable_1mm",
        "label": "1mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 0.5
      },
      {
        "key": "cable_1_5mm",
        "label": "1.5mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 0.6
      },
      {
        "key": "cable_2_5mm",
        "label": "2.5mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 0.8
      },
      {
        "key": "cable_4mm",
        "label": "4mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 1.2
      },
      {
        "key": "cable_6mm",
        "label": "6mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 1.8
      },
      {
        "key": "cable_10mm",
        "label": "10mm T&E cable",
        "type": "number",
        "unit": "per m",
        "default": 3.5
      },
      {
        "key": "backbox_metal",
        "label": "Metal back box",
        "type": "number",
        "unit": "each",
        "default": 1.5
      },
      {
        "key": "backbox_drylining",
        "label": "Dry-lining back box",
        "type": "number",
        "unit": "each",
        "default": 1.8
      },
      {
        "key": "faceplate_budget",
        "label": "Faceplate (budget white)",
        "type": "number",
        "unit": "each",
        "default": 2
      },
      {
        "key": "faceplate_premium",
        "label": "Faceplate (brushed chrome/nickel)",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "socket_single",
        "label": "Single socket install",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "socket_double",
        "label": "Double socket install",
        "type": "number",
        "unit": "each",
        "default": 55
      },
      {
        "key": "switch_install",
        "label": "Light switch install",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "downlight",
        "label": "Downlight supply & fit",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "consumer_unit",
        "label": "Consumer unit replacement",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "first_fix_point",
        "label": "First fix (per point)",
        "type": "number",
        "unit": "per point",
        "default": 25
      },
      {
        "key": "second_fix_point",
        "label": "Second fix (per point)",
        "type": "number",
        "unit": "per point",
        "default": 20
      },
      {
        "key": "testing_cert",
        "label": "Testing & certification",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "painter-decorator",
    "name": "Painter & Decorator",
    "category": "Painting & Decorating",
    "questions": [
      {
        "key": "prep_m2",
        "label": "Surface preparation",
        "type": "number",
        "unit": "per m2",
        "default": 3
      },
      {
        "key": "undercoat_m2",
        "label": "Undercoat/primer",
        "type": "number",
        "unit": "per m2",
        "default": 4
      },
      {
        "key": "emulsion_m2",
        "label": "Emulsion (walls)",
        "type": "number",
        "unit": "per m2",
        "default": 6
      },
      {
        "key": "gloss_m",
        "label": "Gloss (woodwork)",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "wallpaper_roll",
        "label": "Wallpaper (per roll)",
        "type": "number",
        "unit": "per roll",
        "default": 20
      },
      {
        "key": "wallpaper_hanging",
        "label": "Wallpaper hanging",
        "type": "number",
        "unit": "per roll",
        "default": 15
      },
      {
        "key": "ceiling_m2",
        "label": "Ceiling painting",
        "type": "number",
        "unit": "per m2",
        "default": 7
      },
      {
        "key": "exterior_m2",
        "label": "Exterior painting",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "plumber",
    "name": "Plumber",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "first_fix_point",
        "label": "First fix (per point)",
        "type": "number",
        "unit": "per point",
        "default": 30
      },
      {
        "key": "second_fix_point",
        "label": "Second fix (per point)",
        "type": "number",
        "unit": "per point",
        "default": 25
      },
      {
        "key": "copper_15mm_m",
        "label": "15mm copper pipe",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "copper_22mm_m",
        "label": "22mm copper pipe",
        "type": "number",
        "unit": "per m",
        "default": 12
      },
      {
        "key": "copper_28mm_m",
        "label": "28mm copper pipe",
        "type": "number",
        "unit": "per m",
        "default": 16
      },
      {
        "key": "plastic_pipe_m",
        "label": "Plastic pipe (push-fit)",
        "type": "number",
        "unit": "per m",
        "default": 4
      },
      {
        "key": "radiator_supply_fit",
        "label": "Radiator supply & fit",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "boiler_install",
        "label": "Boiler installation",
        "type": "number",
        "unit": "each",
        "default": 2500
      },
      {
        "key": "bathroom_suite",
        "label": "Bathroom suite install",
        "type": "number",
        "unit": "each",
        "default": 1200
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "roofer",
    "name": "Roofer",
    "category": "Roofing",
    "questions": [
      {
        "key": "tiles_m2",
        "label": "Roof tiles",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "felt_membrane_m2",
        "label": "Felt/membrane",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "ridge_tiles_m",
        "label": "Ridge tiles",
        "type": "number",
        "unit": "per m",
        "default": 25
      },
      {
        "key": "lead_flashing_m",
        "label": "Lead flashing",
        "type": "number",
        "unit": "per m",
        "default": 45
      },
      {
        "key": "scaffolding",
        "label": "Scaffolding hire",
        "type": "number",
        "unit": "per week",
        "default": 250
      },
      {
        "key": "flat_roof_m2",
        "label": "Flat roof",
        "type": "number",
        "unit": "per m2",
        "default": 60
      },
      {
        "key": "guttering_m",
        "label": "Guttering",
        "type": "number",
        "unit": "per m",
        "default": 18
      },
      {
        "key": "fascia_m",
        "label": "Fascia board",
        "type": "number",
        "unit": "per m",
        "default": 22
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "landscaper",
    "name": "Landscaper",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "turf_m2",
        "label": "Turf supply & lay",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "paving_m2",
        "label": "Paving",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "fencing_m",
        "label": "Fencing (panel + post)",
        "type": "number",
        "unit": "per m",
        "default": 35
      },
      {
        "key": "decking_m2",
        "label": "Decking",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "hedge_trimming_m",
        "label": "Hedge trimming",
        "type": "number",
        "unit": "per m",
        "default": 6
      },
      {
        "key": "tree_removal",
        "label": "Tree removal",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "skip_hire",
        "label": "Skip hire",
        "type": "number",
        "unit": "each",
        "default": 220
      },
      {
        "key": "topsoil_tonne",
        "label": "Topsoil",
        "type": "number",
        "unit": "per tonne",
        "default": 35
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "tiler",
    "name": "Tiler",
    "category": "Flooring",
    "questions": [
      {
        "key": "wall_tiles_m2",
        "label": "Wall tiling",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "floor_tiles_m2",
        "label": "Floor tiling",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "adhesive_m2",
        "label": "Adhesive",
        "type": "number",
        "unit": "per m2",
        "default": 5
      },
      {
        "key": "grout_m2",
        "label": "Grout",
        "type": "number",
        "unit": "per m2",
        "default": 3
      },
      {
        "key": "cutting_complex",
        "label": "Complex cuts surcharge",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "waterproofing_m2",
        "label": "Waterproofing (tanking)",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "builder-general",
    "name": "Builder / General",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "brickwork_m2",
        "label": "Brickwork",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "blockwork_m2",
        "label": "Blockwork",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "concrete_m3",
        "label": "Concrete",
        "type": "number",
        "unit": "per m3",
        "default": 100
      },
      {
        "key": "demolition_m2",
        "label": "Demolition",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "skip_hire",
        "label": "Skip hire",
        "type": "number",
        "unit": "each",
        "default": 220
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      },
      {
        "key": "labourer_day",
        "label": "Labourer day rate",
        "type": "number",
        "unit": "per day",
        "default": 120
      }
    ]
  },
  {
    "id": "locksmith",
    "name": "Locksmith",
    "category": "Security",
    "questions": [
      {
        "key": "lock_standard",
        "label": "Standard lock supply & fit",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "lock_multipoint",
        "label": "Multi-point lock",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "lock_euro_cylinder",
        "label": "Euro cylinder (anti-snap)",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "emergency_surcharge",
        "label": "Emergency/OOH surcharge",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "key_cutting",
        "label": "Key cutting",
        "type": "number",
        "unit": "each",
        "default": 5
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 60
      }
    ]
  },
  {
    "id": "cleaner",
    "name": "Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 15
      },
      {
        "key": "deep_clean_room",
        "label": "Deep clean (per room)",
        "type": "number",
        "unit": "per room",
        "default": 50
      },
      {
        "key": "end_tenancy_1bed",
        "label": "End-of-tenancy (1 bed)",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "end_tenancy_2bed",
        "label": "End-of-tenancy (2 bed)",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "end_tenancy_3bed",
        "label": "End-of-tenancy (3 bed)",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "carpet_clean_room",
        "label": "Carpet cleaning (per room)",
        "type": "number",
        "unit": "per room",
        "default": 30
      },
      {
        "key": "oven_clean",
        "label": "Oven clean",
        "type": "number",
        "unit": "each",
        "default": 45
      }
    ]
  },
  {
    "id": "photographer",
    "name": "Photographer",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 75
      },
      {
        "key": "per_image_edit",
        "label": "Per-image editing",
        "type": "number",
        "unit": "per image",
        "default": 5
      },
      {
        "key": "travel_mile",
        "label": "Travel",
        "type": "number",
        "unit": "per mile",
        "default": 0.45
      },
      {
        "key": "print_a4",
        "label": "A4 print",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "print_a3",
        "label": "A3 print",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "album",
        "label": "Photo album",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "half_day_package",
        "label": "Half-day package",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "full_day_package",
        "label": "Full-day package",
        "type": "number",
        "unit": "each",
        "default": 550
      }
    ]
  },
  {
    "id": "mobile-mechanic",
    "name": "Mobile Mechanic",
    "category": "Automotive",
    "questions": [
      {
        "key": "diagnostic",
        "label": "Diagnostic check",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "hourly_labour",
        "label": "Hourly labour",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "parts_markup",
        "label": "Parts markup",
        "type": "number",
        "unit": "%",
        "default": 20
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "oil_service",
        "label": "Oil & filter service",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "brake_pads_axle",
        "label": "Brake pads (per axle)",
        "type": "number",
        "unit": "per axle",
        "default": 120
      }
    ]
  },
  {
    "id": "dog-groomer",
    "name": "Dog Groomer",
    "category": "Pet Services",
    "questions": [
      {
        "key": "small_breed",
        "label": "Small breed groom",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "medium_breed",
        "label": "Medium breed groom",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "large_breed",
        "label": "Large breed groom",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "nail_clip",
        "label": "Nail clip (add-on)",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "teeth_clean",
        "label": "Teeth cleaning (add-on)",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "deshed_treatment",
        "label": "De-shed treatment (add-on)",
        "type": "number",
        "unit": "each",
        "default": 12
      },
      {
        "key": "puppy_groom",
        "label": "Puppy introduction groom",
        "type": "number",
        "unit": "each",
        "default": 15
      }
    ]
  },
  {
    "id": "stonemason",
    "name": "Stonemason",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "stone_cutting_m2",
        "label": "Stone cutting",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "pointing_m2",
        "label": "Repointing",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "wall_cladding_m2",
        "label": "Wall cladding",
        "type": "number",
        "unit": "per m2",
        "default": 65
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "structural-engineer",
    "name": "Structural Engineer",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "site_visit",
        "label": "Site visit",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "beam_calc",
        "label": "Beam calculation report",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "full_survey",
        "label": "Full structural survey",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 85
      }
    ]
  },
  {
    "id": "demolition-contractor",
    "name": "Demolition Contractor",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "internal_m2",
        "label": "Internal demolition",
        "type": "number",
        "unit": "per m2",
        "default": 30
      },
      {
        "key": "external_m2",
        "label": "External demolition",
        "type": "number",
        "unit": "per m2",
        "default": 50
      },
      {
        "key": "skip_hire",
        "label": "Skip hire",
        "type": "number",
        "unit": "each",
        "default": 220
      },
      {
        "key": "asbestos_survey",
        "label": "Asbestos survey",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "groundworker",
    "name": "Groundworker",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "excavation_m3",
        "label": "Excavation",
        "type": "number",
        "unit": "per m3",
        "default": 40
      },
      {
        "key": "foundations_m",
        "label": "Strip foundations",
        "type": "number",
        "unit": "per m",
        "default": 80
      },
      {
        "key": "drainage_m",
        "label": "Drainage runs",
        "type": "number",
        "unit": "per m",
        "default": 55
      },
      {
        "key": "concrete_m3",
        "label": "Concrete",
        "type": "number",
        "unit": "per m3",
        "default": 100
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "steel-erector",
    "name": "Steel Erector",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "rsj_install",
        "label": "RSJ beam install",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "steelwork_tonne",
        "label": "Steelwork",
        "type": "number",
        "unit": "per tonne",
        "default": 2500
      },
      {
        "key": "welding_hour",
        "label": "Welding",
        "type": "number",
        "unit": "per hour",
        "default": 60
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 280
      }
    ]
  },
  {
    "id": "scaffolder",
    "name": "Scaffolder",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "basic_scaffold",
        "label": "Basic scaffold (per lift)",
        "type": "number",
        "unit": "per lift",
        "default": 150
      },
      {
        "key": "tower_scaffold",
        "label": "Tower scaffold hire",
        "type": "number",
        "unit": "per week",
        "default": 80
      },
      {
        "key": "chimney_scaffold",
        "label": "Chimney scaffold",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "underpinning-specialist",
    "name": "Underpinning Specialist",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "mass_concrete_m",
        "label": "Mass concrete method",
        "type": "number",
        "unit": "per m",
        "default": 350
      },
      {
        "key": "mini_pile_each",
        "label": "Mini piling",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "survey",
        "label": "Initial survey",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 300
      }
    ]
  },
  {
    "id": "damp-proofing-specialist",
    "name": "Damp Proofing Specialist",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "dpc_injection_m",
        "label": "DPC injection",
        "type": "number",
        "unit": "per m",
        "default": 30
      },
      {
        "key": "tanking_m2",
        "label": "Basement tanking",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "survey",
        "label": "Damp survey",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "insulation-installer",
    "name": "Insulation Installer",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "cavity_wall_m2",
        "label": "Cavity wall insulation",
        "type": "number",
        "unit": "per m2",
        "default": 15
      },
      {
        "key": "loft_m2",
        "label": "Loft insulation",
        "type": "number",
        "unit": "per m2",
        "default": 20
      },
      {
        "key": "spray_foam_m2",
        "label": "Spray foam",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "rendering-specialist",
    "name": "Rendering Specialist",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "sand_cement_m2",
        "label": "Sand/cement render",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "monocouche_m2",
        "label": "Monocouche render",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "silicone_m2",
        "label": "Silicone render",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "floor-sander",
    "name": "Floor Sander",
    "category": "Flooring",
    "questions": [
      {
        "key": "sanding_m2",
        "label": "Floor sanding",
        "type": "number",
        "unit": "per m2",
        "default": 15
      },
      {
        "key": "lacquer_m2",
        "label": "Lacquering",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "oil_finish_m2",
        "label": "Oil finish",
        "type": "number",
        "unit": "per m2",
        "default": 10
      },
      {
        "key": "gap_filling_m2",
        "label": "Gap filling",
        "type": "number",
        "unit": "per m2",
        "default": 5
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "vinyl-fitter",
    "name": "Vinyl Fitter",
    "category": "Flooring",
    "questions": [
      {
        "key": "vinyl_sheet_m2",
        "label": "Sheet vinyl",
        "type": "number",
        "unit": "per m2",
        "default": 18
      },
      {
        "key": "lvt_m2",
        "label": "LVT (luxury vinyl tile)",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "subfloor_prep_m2",
        "label": "Subfloor preparation",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "fitting_m2",
        "label": "Fitting labour",
        "type": "number",
        "unit": "per m2",
        "default": 6
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "laminate-fitter",
    "name": "Laminate Fitter",
    "category": "Flooring",
    "questions": [
      {
        "key": "laminate_budget_m2",
        "label": "Budget laminate",
        "type": "number",
        "unit": "per m2",
        "default": 10
      },
      {
        "key": "laminate_mid_m2",
        "label": "Mid-range laminate",
        "type": "number",
        "unit": "per m2",
        "default": 16
      },
      {
        "key": "laminate_premium_m2",
        "label": "Premium laminate",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "underlay_m2",
        "label": "Underlay",
        "type": "number",
        "unit": "per m2",
        "default": 3
      },
      {
        "key": "fitting_m2",
        "label": "Fitting labour",
        "type": "number",
        "unit": "per m2",
        "default": 5
      }
    ]
  },
  {
    "id": "wood-floor-specialist",
    "name": "Wood Floor Specialist",
    "category": "Flooring",
    "questions": [
      {
        "key": "solid_wood_m2",
        "label": "Solid hardwood",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "engineered_m2",
        "label": "Engineered wood",
        "type": "number",
        "unit": "per m2",
        "default": 30
      },
      {
        "key": "parquet_m2",
        "label": "Parquet",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "fitting_m2",
        "label": "Fitting labour",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "resin-flooring-specialist",
    "name": "Resin Flooring Specialist",
    "category": "Flooring",
    "questions": [
      {
        "key": "epoxy_m2",
        "label": "Epoxy resin floor",
        "type": "number",
        "unit": "per m2",
        "default": 50
      },
      {
        "key": "polyurethane_m2",
        "label": "Polyurethane floor",
        "type": "number",
        "unit": "per m2",
        "default": 60
      },
      {
        "key": "prep_m2",
        "label": "Surface preparation",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "fire-alarm-engineer",
    "name": "Fire Alarm Engineer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "detector_install",
        "label": "Smoke detector install",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "panel_install",
        "label": "Fire panel install",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "zone_cable_m",
        "label": "Zone cable run",
        "type": "number",
        "unit": "per m",
        "default": 3
      },
      {
        "key": "annual_service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "cctv-installer",
    "name": "CCTV Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "camera_install",
        "label": "Camera install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "dvr_setup",
        "label": "DVR/NVR setup",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "cable_run_m",
        "label": "Cable run",
        "type": "number",
        "unit": "per m",
        "default": 3
      },
      {
        "key": "remote_setup",
        "label": "Remote viewing setup",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "av-installer",
    "name": "AV Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "tv_mount",
        "label": "TV wall mount",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "surround_sound",
        "label": "Surround sound setup",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "cable_hide_m",
        "label": "Cable concealment",
        "type": "number",
        "unit": "per m",
        "default": 15
      },
      {
        "key": "multiroom_zone",
        "label": "Multi-room audio zone",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "solar-panel-installer",
    "name": "Solar Panel Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "panel_install",
        "label": "Panel install (per panel)",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "inverter",
        "label": "Inverter supply & fit",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "battery_storage",
        "label": "Battery storage",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "scaffolding",
        "label": "Scaffolding",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 280
      }
    ]
  },
  {
    "id": "ev-charger-installer",
    "name": "EV Charger Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "charger_7kw",
        "label": "7kW charger supply & fit",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "charger_22kw",
        "label": "22kW charger supply & fit",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "cable_run_m",
        "label": "Cable run",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "consumer_upgrade",
        "label": "Consumer unit upgrade",
        "type": "number",
        "unit": "each",
        "default": 350
      }
    ]
  },
  {
    "id": "data-cabling-engineer",
    "name": "Data Cabling Engineer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "cat6_point",
        "label": "Cat6 data point",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "cat6a_point",
        "label": "Cat6a data point",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "fibre_point",
        "label": "Fibre point",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "patch_panel",
        "label": "Patch panel install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "smart-home-installer",
    "name": "Smart Home Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "lighting_zone",
        "label": "Smart lighting zone",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "heating_zone",
        "label": "Smart heating zone",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hub_setup",
        "label": "Hub/controller setup",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "scene_programming",
        "label": "Scene programming",
        "type": "number",
        "unit": "per hour",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "aerial-satellite-engineer",
    "name": "Aerial & Satellite Engineer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "aerial_install",
        "label": "Aerial installation",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "satellite_dish",
        "label": "Satellite dish install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "extra_point",
        "label": "Additional TV point",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "signal_boost",
        "label": "Signal booster",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "pat-tester",
    "name": "PAT Tester",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "per_item",
        "label": "Per item tested",
        "type": "number",
        "unit": "each",
        "default": 1.5
      },
      {
        "key": "min_charge",
        "label": "Minimum charge",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "certificate",
        "label": "Certificate",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      }
    ]
  },
  {
    "id": "gas-engineer",
    "name": "Gas Engineer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "boiler_service",
        "label": "Boiler service",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "gas_safety_cert",
        "label": "Gas safety certificate",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "boiler_install",
        "label": "Boiler installation",
        "type": "number",
        "unit": "each",
        "default": 2500
      },
      {
        "key": "flue_install_m",
        "label": "Flue installation",
        "type": "number",
        "unit": "per m",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "heating-engineer",
    "name": "Heating Engineer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "radiator_install",
        "label": "Radiator install",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "powerflush",
        "label": "System powerflush",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "thermostat_install",
        "label": "Smart thermostat install",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "underfloor_m2",
        "label": "Underfloor heating",
        "type": "number",
        "unit": "per m2",
        "default": 50
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "bathroom-fitter",
    "name": "Bathroom Fitter",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "full_bathroom",
        "label": "Full bathroom refit",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "shower_install",
        "label": "Shower install",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "toilet_install",
        "label": "Toilet install",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "basin_install",
        "label": "Basin install",
        "type": "number",
        "unit": "each",
        "default": 180
      },
      {
        "key": "tiling_m2",
        "label": "Bathroom tiling",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "drainage-engineer",
    "name": "Drainage Engineer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "drain_unblock",
        "label": "Drain unblock",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "cctv_survey",
        "label": "CCTV drain survey",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "drain_repair_m",
        "label": "Drain repair",
        "type": "number",
        "unit": "per m",
        "default": 120
      },
      {
        "key": "manhole_install",
        "label": "Manhole install",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "water-treatment-specialist",
    "name": "Water Treatment Specialist",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "softener_install",
        "label": "Water softener install",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "filter_install",
        "label": "Filter system install",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "annual_service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "underfloor-heating-installer",
    "name": "Underfloor Heating Installer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "wet_system_m2",
        "label": "Wet system",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "electric_mat_m2",
        "label": "Electric mat system",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "thermostat",
        "label": "Thermostat supply & fit",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "screed_m2",
        "label": "Screed",
        "type": "number",
        "unit": "per m2",
        "default": 15
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "spray-painter",
    "name": "Spray Painter",
    "category": "Painting & Decorating",
    "questions": [
      {
        "key": "walls_m2",
        "label": "Wall spray painting",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "ceiling_m2",
        "label": "Ceiling spray",
        "type": "number",
        "unit": "per m2",
        "default": 6
      },
      {
        "key": "kitchen_cabinets",
        "label": "Kitchen cabinet set",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "furniture_piece",
        "label": "Furniture piece",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "wallpaper-hanger",
    "name": "Wallpaper Hanger",
    "category": "Painting & Decorating",
    "questions": [
      {
        "key": "standard_roll",
        "label": "Standard paper (per roll)",
        "type": "number",
        "unit": "per roll",
        "default": 12
      },
      {
        "key": "feature_wall_roll",
        "label": "Feature wallpaper (per roll)",
        "type": "number",
        "unit": "per roll",
        "default": 18
      },
      {
        "key": "stripping_m2",
        "label": "Paper stripping",
        "type": "number",
        "unit": "per m2",
        "default": 4
      },
      {
        "key": "lining_paper_roll",
        "label": "Lining paper (per roll)",
        "type": "number",
        "unit": "per roll",
        "default": 8
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "exterior-painter",
    "name": "Exterior Painter",
    "category": "Painting & Decorating",
    "questions": [
      {
        "key": "masonry_m2",
        "label": "Masonry painting",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "woodwork_m",
        "label": "Exterior woodwork",
        "type": "number",
        "unit": "per m",
        "default": 10
      },
      {
        "key": "fascia_m",
        "label": "Fascia painting",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "scaffold_week",
        "label": "Scaffolding",
        "type": "number",
        "unit": "per week",
        "default": 250
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "sign-writer",
    "name": "Sign Writer",
    "category": "Painting & Decorating",
    "questions": [
      {
        "key": "vinyl_lettering_m",
        "label": "Vinyl lettering",
        "type": "number",
        "unit": "per m",
        "default": 25
      },
      {
        "key": "hand_painted_m2",
        "label": "Hand painted sign",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "vehicle_lettering",
        "label": "Vehicle lettering",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "design_hour",
        "label": "Design time",
        "type": "number",
        "unit": "per hour",
        "default": 40
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      }
    ]
  },
  {
    "id": "chimney-specialist",
    "name": "Chimney Specialist",
    "category": "Roofing",
    "questions": [
      {
        "key": "repoint_chimney",
        "label": "Chimney repointing",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "chimney_cap",
        "label": "Chimney cap/cowl",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "chimney_removal",
        "label": "Chimney removal",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "flashing_repair",
        "label": "Flashing repair",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "scaffold",
        "label": "Scaffolding",
        "type": "number",
        "unit": "each",
        "default": 250
      }
    ]
  },
  {
    "id": "flat-roof-specialist",
    "name": "Flat Roof Specialist",
    "category": "Roofing",
    "questions": [
      {
        "key": "felt_m2",
        "label": "Felt flat roof",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "grp_m2",
        "label": "GRP fibreglass roof",
        "type": "number",
        "unit": "per m2",
        "default": 70
      },
      {
        "key": "epdm_m2",
        "label": "EPDM rubber roof",
        "type": "number",
        "unit": "per m2",
        "default": 55
      },
      {
        "key": "insulation_m2",
        "label": "Insulation",
        "type": "number",
        "unit": "per m2",
        "default": 15
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "lead-worker",
    "name": "Lead Worker",
    "category": "Roofing",
    "questions": [
      {
        "key": "lead_flashing_m",
        "label": "Lead flashing",
        "type": "number",
        "unit": "per m",
        "default": 45
      },
      {
        "key": "lead_valley_m",
        "label": "Lead valley",
        "type": "number",
        "unit": "per m",
        "default": 80
      },
      {
        "key": "lead_flat_m2",
        "label": "Lead flat roof",
        "type": "number",
        "unit": "per m2",
        "default": 120
      },
      {
        "key": "lead_bay_top",
        "label": "Bay top cover",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 280
      }
    ]
  },
  {
    "id": "cladding-installer",
    "name": "Cladding Installer",
    "category": "Roofing",
    "questions": [
      {
        "key": "upvc_m2",
        "label": "uPVC cladding",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "timber_m2",
        "label": "Timber cladding",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "composite_m2",
        "label": "Composite cladding",
        "type": "number",
        "unit": "per m2",
        "default": 60
      },
      {
        "key": "fascia_soffit_m",
        "label": "Fascia & soffit",
        "type": "number",
        "unit": "per m",
        "default": 30
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "garden-designer",
    "name": "Garden Designer",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "design_small",
        "label": "Small garden design",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "design_medium",
        "label": "Medium garden design",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "design_large",
        "label": "Large garden design",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "consultation",
        "label": "Initial consultation",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "tree-surgeon",
    "name": "Tree Surgeon",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "tree_fell_small",
        "label": "Small tree felling",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "tree_fell_large",
        "label": "Large tree felling",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "crown_reduction",
        "label": "Crown reduction",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "stump_removal",
        "label": "Stump grinding",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hedge_trim_m",
        "label": "Hedge trimming",
        "type": "number",
        "unit": "per m",
        "default": 6
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "fence-installer",
    "name": "Fence Installer",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "panel_fence_m",
        "label": "Panel fence",
        "type": "number",
        "unit": "per m",
        "default": 35
      },
      {
        "key": "close_board_m",
        "label": "Close board fence",
        "type": "number",
        "unit": "per m",
        "default": 45
      },
      {
        "key": "post_rail_m",
        "label": "Post & rail",
        "type": "number",
        "unit": "per m",
        "default": 20
      },
      {
        "key": "gate_install",
        "label": "Gate install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "concrete_post",
        "label": "Concrete post",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "driveway-installer",
    "name": "Driveway Installer",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "block_paving_m2",
        "label": "Block paving",
        "type": "number",
        "unit": "per m2",
        "default": 60
      },
      {
        "key": "tarmac_m2",
        "label": "Tarmac",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "resin_bound_m2",
        "label": "Resin bound",
        "type": "number",
        "unit": "per m2",
        "default": 70
      },
      {
        "key": "gravel_m2",
        "label": "Gravel",
        "type": "number",
        "unit": "per m2",
        "default": 20
      },
      {
        "key": "edging_m",
        "label": "Edging",
        "type": "number",
        "unit": "per m",
        "default": 10
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "irrigation-specialist",
    "name": "Irrigation Specialist",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "sprinkler_zone",
        "label": "Sprinkler zone",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "drip_line_m",
        "label": "Drip irrigation",
        "type": "number",
        "unit": "per m",
        "default": 5
      },
      {
        "key": "controller",
        "label": "Controller install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 45
      }
    ]
  },
  {
    "id": "pond-specialist",
    "name": "Pond Specialist",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "pond_small",
        "label": "Small pond build",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "pond_medium",
        "label": "Medium pond build",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "liner_m2",
        "label": "Pond liner",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "pump_install",
        "label": "Pump install",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "artificial-grass-installer",
    "name": "Artificial Grass Installer",
    "category": "Landscaping & Gardens",
    "questions": [
      {
        "key": "grass_m2",
        "label": "Artificial grass supply & fit",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "sub_base_m2",
        "label": "Sub-base preparation",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "edging_m",
        "label": "Edging",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "joining_m",
        "label": "Joining tape",
        "type": "number",
        "unit": "per m",
        "default": 5
      }
    ]
  },
  {
    "id": "window-cleaner",
    "name": "Window Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "per_window",
        "label": "Per window",
        "type": "number",
        "unit": "each",
        "default": 3
      },
      {
        "key": "conservatory",
        "label": "Conservatory",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "fascia_clean_m",
        "label": "Fascia/gutter clean",
        "type": "number",
        "unit": "per m",
        "default": 4
      },
      {
        "key": "monthly_contract",
        "label": "Monthly contract (house)",
        "type": "number",
        "unit": "per month",
        "default": 20
      }
    ]
  },
  {
    "id": "pressure-washer",
    "name": "Pressure Washer",
    "category": "Cleaning",
    "questions": [
      {
        "key": "driveway_m2",
        "label": "Driveway cleaning",
        "type": "number",
        "unit": "per m2",
        "default": 5
      },
      {
        "key": "patio_m2",
        "label": "Patio cleaning",
        "type": "number",
        "unit": "per m2",
        "default": 5
      },
      {
        "key": "deck_m2",
        "label": "Decking cleaning",
        "type": "number",
        "unit": "per m2",
        "default": 6
      },
      {
        "key": "wall_m2",
        "label": "Wall/render cleaning",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "oven-cleaner",
    "name": "Oven Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "single_oven",
        "label": "Single oven",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "double_oven",
        "label": "Double oven",
        "type": "number",
        "unit": "each",
        "default": 65
      },
      {
        "key": "range_cooker",
        "label": "Range cooker",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "hob",
        "label": "Hob",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "extractor",
        "label": "Extractor hood",
        "type": "number",
        "unit": "each",
        "default": 15
      }
    ]
  },
  {
    "id": "chimney-sweep",
    "name": "Chimney Sweep",
    "category": "Cleaning",
    "questions": [
      {
        "key": "standard_sweep",
        "label": "Standard sweep",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "bird_nest_removal",
        "label": "Bird nest removal",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "cctv_inspection",
        "label": "CCTV inspection",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "cowl_fitting",
        "label": "Cowl fitting",
        "type": "number",
        "unit": "each",
        "default": 70
      }
    ]
  },
  {
    "id": "gutter-cleaner",
    "name": "Gutter Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "per_metre",
        "label": "Gutter clean",
        "type": "number",
        "unit": "per m",
        "default": 5
      },
      {
        "key": "downpipe_clear",
        "label": "Downpipe clearance",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "repair_m",
        "label": "Minor gutter repair",
        "type": "number",
        "unit": "per m",
        "default": 12
      },
      {
        "key": "min_charge",
        "label": "Minimum charge",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "commercial-cleaner",
    "name": "Commercial Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 18
      },
      {
        "key": "office_m2",
        "label": "Office cleaning",
        "type": "number",
        "unit": "per m2",
        "default": 3
      },
      {
        "key": "deep_clean_m2",
        "label": "Deep clean",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "window_int_m2",
        "label": "Internal windows",
        "type": "number",
        "unit": "per m2",
        "default": 4
      }
    ]
  },
  {
    "id": "biohazard-cleaner",
    "name": "Biohazard Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "per_room",
        "label": "Room decontamination",
        "type": "number",
        "unit": "per room",
        "default": 300
      },
      {
        "key": "sharps_removal",
        "label": "Sharps removal",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      }
    ]
  },
  {
    "id": "mot-tester",
    "name": "MOT Tester",
    "category": "Automotive",
    "questions": [
      {
        "key": "mot_test",
        "label": "MOT test",
        "type": "number",
        "unit": "each",
        "default": 45
      },
      {
        "key": "retest",
        "label": "MOT retest",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "advisory_check",
        "label": "Advisory items check",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "hourly_labour",
        "label": "Hourly labour",
        "type": "number",
        "unit": "per hour",
        "default": 45
      }
    ]
  },
  {
    "id": "auto-electrician",
    "name": "Auto Electrician",
    "category": "Automotive",
    "questions": [
      {
        "key": "diagnostic",
        "label": "Diagnostic",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "wiring_repair",
        "label": "Wiring repair",
        "type": "number",
        "unit": "per hour",
        "default": 55
      },
      {
        "key": "alarm_install",
        "label": "Alarm/immobiliser install",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "dash_cam_install",
        "label": "Dash cam install",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "body-shop-repairer",
    "name": "Body Shop Repairer",
    "category": "Automotive",
    "questions": [
      {
        "key": "panel_respray",
        "label": "Panel respray",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "dent_removal",
        "label": "Paintless dent removal",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "scratch_repair",
        "label": "Scratch repair",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "bumper_repair",
        "label": "Bumper repair",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 45
      }
    ]
  },
  {
    "id": "tyre-fitter-mobile",
    "name": "Mobile Tyre Fitter",
    "category": "Automotive",
    "questions": [
      {
        "key": "tyre_fit",
        "label": "Tyre fitting (per tyre)",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "balance",
        "label": "Wheel balance (per wheel)",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "puncture_repair",
        "label": "Puncture repair",
        "type": "number",
        "unit": "each",
        "default": 25
      }
    ]
  },
  {
    "id": "vehicle-wrapper",
    "name": "Vehicle Wrapper",
    "category": "Automotive",
    "questions": [
      {
        "key": "full_wrap",
        "label": "Full vehicle wrap",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "partial_wrap",
        "label": "Partial wrap",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "signage_m2",
        "label": "Commercial signage",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "paint_protection",
        "label": "Paint protection film",
        "type": "number",
        "unit": "per panel",
        "default": 200
      }
    ]
  },
  {
    "id": "windscreen-repair",
    "name": "Windscreen Repair",
    "category": "Automotive",
    "questions": [
      {
        "key": "chip_repair",
        "label": "Chip repair",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "windscreen_replace",
        "label": "Windscreen replacement",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "rear_window",
        "label": "Rear window",
        "type": "number",
        "unit": "each",
        "default": 200
      }
    ]
  },
  {
    "id": "valeter",
    "name": "Car Valeter",
    "category": "Automotive",
    "questions": [
      {
        "key": "exterior_wash",
        "label": "Exterior wash",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "mini_valet",
        "label": "Mini valet",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "full_valet",
        "label": "Full valet",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "interior_deep",
        "label": "Interior deep clean",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "machine_polish",
        "label": "Machine polish",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "barber",
    "name": "Barber",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "mens_cut",
        "label": "Men's cut",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "beard_trim",
        "label": "Beard trim",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "hot_towel_shave",
        "label": "Hot towel shave",
        "type": "number",
        "unit": "each",
        "default": 18
      },
      {
        "key": "kids_cut",
        "label": "Kids cut",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "hairdresser",
    "name": "Hairdresser",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "cut_blow_dry",
        "label": "Cut & blow dry",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "colour_full",
        "label": "Full colour",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "highlights",
        "label": "Highlights",
        "type": "number",
        "unit": "each",
        "default": 70
      },
      {
        "key": "treatment",
        "label": "Hair treatment",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 30
      }
    ]
  },
  {
    "id": "beauty-therapist",
    "name": "Beauty Therapist",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "facial",
        "label": "Facial treatment",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "waxing_half_leg",
        "label": "Half leg wax",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "waxing_full_leg",
        "label": "Full leg wax",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "manicure",
        "label": "Manicure",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "pedicure",
        "label": "Pedicure",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "massage-therapist",
    "name": "Massage Therapist",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "thirty_min",
        "label": "30 minute massage",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "sixty_min",
        "label": "60 minute massage",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "ninety_min",
        "label": "90 minute massage",
        "type": "number",
        "unit": "each",
        "default": 70
      },
      {
        "key": "sports_massage",
        "label": "Sports massage (60 min)",
        "type": "number",
        "unit": "each",
        "default": 55
      },
      {
        "key": "callout",
        "label": "Mobile call-out",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "nail-technician",
    "name": "Nail Technician",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "gel_nails",
        "label": "Gel nails (full set)",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "acrylic_nails",
        "label": "Acrylic nails (full set)",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "infill",
        "label": "Infill",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "nail_art",
        "label": "Nail art (per nail)",
        "type": "number",
        "unit": "each",
        "default": 3
      },
      {
        "key": "removal",
        "label": "Removal",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "makeup-artist",
    "name": "Makeup Artist",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "bridal",
        "label": "Bridal makeup",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "evening",
        "label": "Evening/event makeup",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "trial",
        "label": "Trial session",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "travel_mile",
        "label": "Travel",
        "type": "number",
        "unit": "per mile",
        "default": 0.45
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "personal-trainer",
    "name": "Personal Trainer",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "session_1hr",
        "label": "1-hour session",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "session_30min",
        "label": "30-min session",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "package_10",
        "label": "10-session package",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "online_plan",
        "label": "Online plan (monthly)",
        "type": "number",
        "unit": "per month",
        "default": 60
      }
    ]
  },
  {
    "id": "tattoo-artist",
    "name": "Tattoo Artist",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "small_piece",
        "label": "Small piece (palm-size)",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "medium_piece",
        "label": "Medium piece",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 80
      },
      {
        "key": "touch_up",
        "label": "Touch up",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "laser-treatment-technician",
    "name": "Laser Treatment Technician",
    "category": "Health & Beauty",
    "questions": [
      {
        "key": "small_area",
        "label": "Small area session",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "medium_area",
        "label": "Medium area session",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "large_area",
        "label": "Large area session",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "course_6",
        "label": "Course of 6 sessions",
        "type": "number",
        "unit": "each",
        "default": 400
      }
    ]
  },
  {
    "id": "videographer",
    "name": "Videographer",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 85
      },
      {
        "key": "half_day",
        "label": "Half-day shoot",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "full_day",
        "label": "Full-day shoot",
        "type": "number",
        "unit": "each",
        "default": 650
      },
      {
        "key": "editing_hour",
        "label": "Post-production editing",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "drone_addon",
        "label": "Drone footage add-on",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "drone-operator",
    "name": "Drone Operator",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "half_day",
        "label": "Half-day hire",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "full_day",
        "label": "Full-day hire",
        "type": "number",
        "unit": "each",
        "default": 450
      },
      {
        "key": "per_image",
        "label": "Per edited image",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "video_minute",
        "label": "Per minute of edited video",
        "type": "number",
        "unit": "per minute",
        "default": 40
      }
    ]
  },
  {
    "id": "wedding-photographer",
    "name": "Wedding Photographer",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "half_day",
        "label": "Half-day coverage",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "full_day",
        "label": "Full-day coverage",
        "type": "number",
        "unit": "each",
        "default": 1200
      },
      {
        "key": "album_standard",
        "label": "Standard album",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "album_premium",
        "label": "Premium album",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "per_image",
        "label": "Per extra edited image",
        "type": "number",
        "unit": "each",
        "default": 5
      }
    ]
  },
  {
    "id": "graphic-designer",
    "name": "Graphic Designer",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "logo_basic",
        "label": "Basic logo design",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "logo_premium",
        "label": "Premium logo package",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "flyer_design",
        "label": "Flyer/poster design",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "branding_package",
        "label": "Full branding package",
        "type": "number",
        "unit": "each",
        "default": 1000
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      }
    ]
  },
  {
    "id": "social-media-manager",
    "name": "Social Media Manager",
    "category": "Photography & Media",
    "questions": [
      {
        "key": "monthly_package",
        "label": "Monthly management",
        "type": "number",
        "unit": "per month",
        "default": 400
      },
      {
        "key": "content_creation",
        "label": "Content creation (per post)",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "strategy_session",
        "label": "Strategy session",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      }
    ]
  },
  {
    "id": "dog-walker",
    "name": "Dog Walker",
    "category": "Pet Services",
    "questions": [
      {
        "key": "per_walk",
        "label": "Per walk (30 min)",
        "type": "number",
        "unit": "each",
        "default": 12
      },
      {
        "key": "per_walk_60",
        "label": "Per walk (60 min)",
        "type": "number",
        "unit": "each",
        "default": 18
      },
      {
        "key": "group_walk",
        "label": "Group walk",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "puppy_visit",
        "label": "Puppy visit",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "pet-sitter",
    "name": "Pet Sitter",
    "category": "Pet Services",
    "questions": [
      {
        "key": "per_night",
        "label": "Per night (in your home)",
        "type": "number",
        "unit": "per night",
        "default": 30
      },
      {
        "key": "day_care",
        "label": "Day care",
        "type": "number",
        "unit": "per day",
        "default": 20
      },
      {
        "key": "per_visit",
        "label": "Drop-in visit",
        "type": "number",
        "unit": "each",
        "default": 12
      },
      {
        "key": "cat_visit",
        "label": "Cat feeding visit",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "dog-trainer",
    "name": "Dog Trainer",
    "category": "Pet Services",
    "questions": [
      {
        "key": "one_to_one",
        "label": "1-to-1 session (1hr)",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "group_class",
        "label": "Group class",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "puppy_course",
        "label": "Puppy course (6 weeks)",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "behaviour_consult",
        "label": "Behaviour consultation",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "pet-photographer",
    "name": "Pet Photographer",
    "category": "Pet Services",
    "questions": [
      {
        "key": "mini_session",
        "label": "Mini session (30 min)",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "full_session",
        "label": "Full session (1 hr)",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "per_image",
        "label": "Per edited image",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "travel_mile",
        "label": "Travel",
        "type": "number",
        "unit": "per mile",
        "default": 0.45
      }
    ]
  },
  {
    "id": "cat-groomer",
    "name": "Cat Groomer",
    "category": "Pet Services",
    "questions": [
      {
        "key": "bath_groom",
        "label": "Bath & groom",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "lion_cut",
        "label": "Lion cut",
        "type": "number",
        "unit": "each",
        "default": 55
      },
      {
        "key": "matt_removal",
        "label": "Matt removal",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "nail_clip",
        "label": "Nail clip",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "aquarium-maintenance",
    "name": "Aquarium Maintenance",
    "category": "Pet Services",
    "questions": [
      {
        "key": "small_tank",
        "label": "Small tank service",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "large_tank",
        "label": "Large tank service",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "water_test",
        "label": "Water testing",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "monthly_contract",
        "label": "Monthly contract",
        "type": "number",
        "unit": "per month",
        "default": 50
      }
    ]
  },
  {
    "id": "carpenter",
    "name": "Carpenter",
    "category": "Home Services",
    "questions": [
      {
        "key": "shelving_m",
        "label": "Shelving",
        "type": "number",
        "unit": "per m",
        "default": 25
      },
      {
        "key": "door_hanging",
        "label": "Door hanging",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "skirting_m",
        "label": "Skirting board",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "bespoke_unit",
        "label": "Bespoke unit",
        "type": "number",
        "unit": "per day",
        "default": 250
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "kitchen-fitter",
    "name": "Kitchen Fitter",
    "category": "Home Services",
    "questions": [
      {
        "key": "base_unit",
        "label": "Base unit fitting",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "wall_unit",
        "label": "Wall unit fitting",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "worktop_m",
        "label": "Worktop fitting",
        "type": "number",
        "unit": "per m",
        "default": 50
      },
      {
        "key": "sink_install",
        "label": "Sink install",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "curtain-blinds-fitter",
    "name": "Curtain & Blinds Fitter",
    "category": "Home Services",
    "questions": [
      {
        "key": "roller_blind",
        "label": "Roller blind fit",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "venetian_blind",
        "label": "Venetian blind fit",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "curtain_pole",
        "label": "Curtain pole fit",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "electric_blind",
        "label": "Electric blind fit",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "handyman",
    "name": "Handyman",
    "category": "Home Services",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      },
      {
        "key": "half_day",
        "label": "Half day",
        "type": "number",
        "unit": "each",
        "default": 130
      },
      {
        "key": "full_day",
        "label": "Full day",
        "type": "number",
        "unit": "each",
        "default": 220
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "removals-operative",
    "name": "Removals Operative",
    "category": "Home Services",
    "questions": [
      {
        "key": "man_van_hour",
        "label": "Man & van (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 45
      },
      {
        "key": "two_man_hour",
        "label": "Two men & van (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 65
      },
      {
        "key": "packing_box",
        "label": "Packing (per box)",
        "type": "number",
        "unit": "each",
        "default": 5
      },
      {
        "key": "piano_move",
        "label": "Piano move",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "upholsterer",
    "name": "Upholsterer",
    "category": "Home Services",
    "questions": [
      {
        "key": "dining_chair",
        "label": "Dining chair re-upholster",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "armchair",
        "label": "Armchair re-upholster",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "sofa_2seat",
        "label": "2-seater sofa",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "fabric_m",
        "label": "Fabric supply",
        "type": "number",
        "unit": "per m",
        "default": 20
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "appliance-repair",
    "name": "Appliance Repair Technician",
    "category": "Home Services",
    "questions": [
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "washing_machine",
        "label": "Washing machine repair",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "dishwasher",
        "label": "Dishwasher repair",
        "type": "number",
        "unit": "each",
        "default": 90
      },
      {
        "key": "fridge_freezer",
        "label": "Fridge/freezer repair",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 45
      }
    ]
  },
  {
    "id": "garage-door-installer",
    "name": "Garage Door Installer",
    "category": "Home Services",
    "questions": [
      {
        "key": "roller_door",
        "label": "Roller door supply & fit",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "sectional_door",
        "label": "Sectional door supply & fit",
        "type": "number",
        "unit": "each",
        "default": 1200
      },
      {
        "key": "automation",
        "label": "Automation kit",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "glazier",
    "name": "Glazier",
    "category": "Home Services",
    "questions": [
      {
        "key": "single_pane",
        "label": "Single pane replacement",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "double_glazed_unit",
        "label": "Double glazed unit",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "mirror_install",
        "label": "Mirror install",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "splashback_m2",
        "label": "Glass splashback",
        "type": "number",
        "unit": "per m2",
        "default": 120
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "aerial-installer",
    "name": "TV Aerial Installer",
    "category": "Home Services",
    "questions": [
      {
        "key": "aerial_install",
        "label": "Aerial installation",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "extra_point",
        "label": "Additional TV point",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "wall_mount",
        "label": "TV wall mount",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "alarm-installer",
    "name": "Alarm Installer",
    "category": "Security",
    "questions": [
      {
        "key": "wired_system",
        "label": "Wired alarm system",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "wireless_system",
        "label": "Wireless alarm system",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "sensor_install",
        "label": "Sensor install",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "annual_service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 50
      }
    ]
  },
  {
    "id": "access-control-installer",
    "name": "Access Control Installer",
    "category": "Security",
    "questions": [
      {
        "key": "keypad_system",
        "label": "Keypad entry system",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "fob_system",
        "label": "Fob system",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "intercom",
        "label": "Intercom install",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "electric_lock",
        "label": "Electric lock",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "security-shutter-installer",
    "name": "Security Shutter Installer",
    "category": "Security",
    "questions": [
      {
        "key": "roller_shutter",
        "label": "Roller shutter",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "security_grille",
        "label": "Security grille",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "electric_operation",
        "label": "Electric operation",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "annual_service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "safe-engineer",
    "name": "Safe Engineer",
    "category": "Security",
    "questions": [
      {
        "key": "safe_install",
        "label": "Safe installation",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "safe_opening",
        "label": "Emergency safe opening",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "combination_change",
        "label": "Combination change",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "fire-door-installer",
    "name": "Fire Door Installer",
    "category": "Security",
    "questions": [
      {
        "key": "door_supply_fit",
        "label": "Fire door supply & fit",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "intumescent_strip",
        "label": "Intumescent strip",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "closer_install",
        "label": "Door closer install",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "certification",
        "label": "Certification per door",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "caterer",
    "name": "Caterer",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "per_head_buffet",
        "label": "Buffet (per head)",
        "type": "number",
        "unit": "per head",
        "default": 15
      },
      {
        "key": "per_head_sitdown",
        "label": "Sit-down meal (per head)",
        "type": "number",
        "unit": "per head",
        "default": 35
      },
      {
        "key": "canape_per_head",
        "label": "Canapes (per head)",
        "type": "number",
        "unit": "per head",
        "default": 10
      },
      {
        "key": "staff_per_hour",
        "label": "Waiting staff",
        "type": "number",
        "unit": "per hour",
        "default": 15
      },
      {
        "key": "equipment_hire",
        "label": "Equipment hire",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "mobile-bar-service",
    "name": "Mobile Bar Service",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "bar_hire",
        "label": "Bar hire (event)",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "bartender_hour",
        "label": "Bartender",
        "type": "number",
        "unit": "per hour",
        "default": 20
      },
      {
        "key": "cocktail_each",
        "label": "Cocktail",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "glass_hire_each",
        "label": "Glass hire",
        "type": "number",
        "unit": "each",
        "default": 0.5
      }
    ]
  },
  {
    "id": "event-planner",
    "name": "Event Planner",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "planning_fee",
        "label": "Planning fee (% of budget)",
        "type": "number",
        "unit": "% of budget",
        "default": 10
      },
      {
        "key": "coordination_day",
        "label": "On-the-day coordination",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "consultation",
        "label": "Initial consultation",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      }
    ]
  },
  {
    "id": "marquee-hire",
    "name": "Marquee Hire",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "small_marquee",
        "label": "Small marquee (up to 30)",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "medium_marquee",
        "label": "Medium marquee (up to 60)",
        "type": "number",
        "unit": "each",
        "default": 900
      },
      {
        "key": "large_marquee",
        "label": "Large marquee (up to 120)",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "flooring_m2",
        "label": "Marquee flooring",
        "type": "number",
        "unit": "per m2",
        "default": 8
      },
      {
        "key": "lighting",
        "label": "Lighting package",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "dj",
    "name": "DJ",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "evening_4hr",
        "label": "Evening set (4 hrs)",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "extra_hour",
        "label": "Extra hour",
        "type": "number",
        "unit": "per hour",
        "default": 60
      },
      {
        "key": "lighting_package",
        "label": "Lighting package",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "fog_machine",
        "label": "Fog machine add-on",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "wedding-planner",
    "name": "Wedding Planner",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "full_planning",
        "label": "Full planning package",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "partial_planning",
        "label": "Partial planning",
        "type": "number",
        "unit": "each",
        "default": 1000
      },
      {
        "key": "on_day_coordination",
        "label": "On-the-day coordination",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "cake-maker",
    "name": "Cake Maker",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "birthday_cake",
        "label": "Birthday cake",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "wedding_tier",
        "label": "Wedding cake (per tier)",
        "type": "number",
        "unit": "per tier",
        "default": 100
      },
      {
        "key": "cupcakes_dozen",
        "label": "Cupcakes (dozen)",
        "type": "number",
        "unit": "per dozen",
        "default": 25
      },
      {
        "key": "delivery",
        "label": "Delivery",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "florist-events",
    "name": "Event Florist",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "bridal_bouquet",
        "label": "Bridal bouquet",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "table_arrangement",
        "label": "Table arrangement",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "venue_flowers",
        "label": "Venue flowers package",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "buttonhole",
        "label": "Buttonhole",
        "type": "number",
        "unit": "each",
        "default": 8
      }
    ]
  },
  {
    "id": "sports-coach",
    "name": "Sports Coach",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "session_1hr",
        "label": "1-hour session",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "group_session",
        "label": "Group session (per person)",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "package_10",
        "label": "10-session package",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "travel_mile",
        "label": "Travel",
        "type": "number",
        "unit": "per mile",
        "default": 0.4
      }
    ]
  },
  {
    "id": "swimming-instructor",
    "name": "Swimming Instructor",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "private_lesson",
        "label": "Private lesson (30 min)",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "group_lesson",
        "label": "Group lesson (per child)",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "course_10",
        "label": "10-lesson course",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "pool_hire",
        "label": "Pool hire",
        "type": "number",
        "unit": "per hour",
        "default": 30
      }
    ]
  },
  {
    "id": "yoga-instructor",
    "name": "Yoga Instructor",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "private_session",
        "label": "Private session (1hr)",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "group_class",
        "label": "Group class (per person)",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "corporate_session",
        "label": "Corporate session",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "online_class",
        "label": "Online class",
        "type": "number",
        "unit": "each",
        "default": 15
      }
    ]
  },
  {
    "id": "martial-arts-instructor",
    "name": "Martial Arts Instructor",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "private_lesson",
        "label": "Private lesson",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "group_class",
        "label": "Group class (per person)",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "grading_fee",
        "label": "Grading fee",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "monthly_membership",
        "label": "Monthly membership",
        "type": "number",
        "unit": "per month",
        "default": 40
      }
    ]
  },
  {
    "id": "golf-instructor",
    "name": "Golf Instructor",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "lesson_30min",
        "label": "30-min lesson",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "lesson_60min",
        "label": "60-min lesson",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "course_5",
        "label": "5-lesson course",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "playing_lesson",
        "label": "Playing lesson (9 holes)",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "riding-instructor",
    "name": "Riding Instructor",
    "category": "Sports & Fitness",
    "questions": [
      {
        "key": "private_lesson",
        "label": "Private lesson (1hr)",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "group_lesson",
        "label": "Group lesson",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "hack_per_hour",
        "label": "Hack (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 30
      },
      {
        "key": "arena_hire",
        "label": "Arena hire",
        "type": "number",
        "unit": "per hour",
        "default": 20
      }
    ]
  },
  {
    "id": "tutor",
    "name": "Private Tutor",
    "category": "Education & Training",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 30
      },
      {
        "key": "gcse_hour",
        "label": "GCSE level (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 30
      },
      {
        "key": "a_level_hour",
        "label": "A-Level (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 35
      },
      {
        "key": "online_hour",
        "label": "Online session",
        "type": "number",
        "unit": "per hour",
        "default": 25
      }
    ]
  },
  {
    "id": "driving-instructor",
    "name": "Driving Instructor",
    "category": "Education & Training",
    "questions": [
      {
        "key": "lesson_1hr",
        "label": "1-hour lesson",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "lesson_2hr",
        "label": "2-hour lesson",
        "type": "number",
        "unit": "each",
        "default": 55
      },
      {
        "key": "intensive_week",
        "label": "Intensive course (week)",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "test_car_hire",
        "label": "Test car hire",
        "type": "number",
        "unit": "each",
        "default": 50
      }
    ]
  },
  {
    "id": "music-teacher",
    "name": "Music Teacher",
    "category": "Education & Training",
    "questions": [
      {
        "key": "lesson_30min",
        "label": "30-min lesson",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "lesson_60min",
        "label": "60-min lesson",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "group_session",
        "label": "Group session (per person)",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "online_lesson",
        "label": "Online lesson",
        "type": "number",
        "unit": "each",
        "default": 18
      }
    ]
  },
  {
    "id": "language-teacher",
    "name": "Language Teacher",
    "category": "Education & Training",
    "questions": [
      {
        "key": "private_hour",
        "label": "Private lesson (1hr)",
        "type": "number",
        "unit": "per hour",
        "default": 30
      },
      {
        "key": "group_hour",
        "label": "Group class (per person)",
        "type": "number",
        "unit": "per hour",
        "default": 12
      },
      {
        "key": "online_hour",
        "label": "Online lesson",
        "type": "number",
        "unit": "per hour",
        "default": 25
      },
      {
        "key": "translation_word",
        "label": "Translation (per word)",
        "type": "number",
        "unit": "per word",
        "default": 0.1
      }
    ]
  },
  {
    "id": "first-aid-trainer",
    "name": "First Aid Trainer",
    "category": "Education & Training",
    "questions": [
      {
        "key": "course_1day",
        "label": "1-day course (per person)",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "group_course",
        "label": "Group course (up to 12)",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "refresher",
        "label": "Refresher course",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "certificate",
        "label": "Certificate",
        "type": "number",
        "unit": "each",
        "default": 15
      }
    ]
  },
  {
    "id": "health-safety-consultant",
    "name": "Health & Safety Consultant",
    "category": "Education & Training",
    "questions": [
      {
        "key": "risk_assessment",
        "label": "Risk assessment",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "fire_assessment",
        "label": "Fire risk assessment",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "policy_writing",
        "label": "Policy writing",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 400
      }
    ]
  },
  {
    "id": "courier",
    "name": "Courier",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "local_delivery",
        "label": "Local delivery",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "same_day",
        "label": "Same-day delivery",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "per_mile",
        "label": "Per mile rate",
        "type": "number",
        "unit": "per mile",
        "default": 1.5
      },
      {
        "key": "waiting_time",
        "label": "Waiting time",
        "type": "number",
        "unit": "per hour",
        "default": 20
      }
    ]
  },
  {
    "id": "man-with-van",
    "name": "Man with Van",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      },
      {
        "key": "half_day",
        "label": "Half day",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "full_day",
        "label": "Full day",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "per_mile",
        "label": "Per mile (distance)",
        "type": "number",
        "unit": "per mile",
        "default": 1
      }
    ]
  },
  {
    "id": "haulage-driver",
    "name": "Haulage Driver",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "per_mile",
        "label": "Per mile",
        "type": "number",
        "unit": "per mile",
        "default": 2
      },
      {
        "key": "per_pallet",
        "label": "Per pallet",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "waiting_hour",
        "label": "Waiting time",
        "type": "number",
        "unit": "per hour",
        "default": 25
      },
      {
        "key": "overnight",
        "label": "Overnight rate",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "skip-hire-operator",
    "name": "Skip Hire Operator",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "mini_skip",
        "label": "Mini skip (2yd)",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "midi_skip",
        "label": "Midi skip (4yd)",
        "type": "number",
        "unit": "each",
        "default": 180
      },
      {
        "key": "builders_skip",
        "label": "Builders skip (6yd)",
        "type": "number",
        "unit": "each",
        "default": 220
      },
      {
        "key": "large_skip",
        "label": "Large skip (8yd)",
        "type": "number",
        "unit": "each",
        "default": 280
      },
      {
        "key": "permit",
        "label": "Council permit",
        "type": "number",
        "unit": "each",
        "default": 30
      }
    ]
  },
  {
    "id": "vehicle-recovery",
    "name": "Vehicle Recovery",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "local_recovery",
        "label": "Local recovery (up to 10mi)",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "per_mile",
        "label": "Per additional mile",
        "type": "number",
        "unit": "per mile",
        "default": 2.5
      },
      {
        "key": "winch_recovery",
        "label": "Winch recovery",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "storage_day",
        "label": "Storage (per day)",
        "type": "number",
        "unit": "per day",
        "default": 15
      }
    ]
  },
  {
    "id": "taxi-driver",
    "name": "Taxi/Private Hire",
    "category": "Transport & Delivery",
    "questions": [
      {
        "key": "base_fare",
        "label": "Base fare",
        "type": "number",
        "unit": "each",
        "default": 3
      },
      {
        "key": "per_mile",
        "label": "Per mile",
        "type": "number",
        "unit": "per mile",
        "default": 2
      },
      {
        "key": "waiting_min",
        "label": "Waiting (per minute)",
        "type": "number",
        "unit": "per minute",
        "default": 0.4
      },
      {
        "key": "airport_transfer",
        "label": "Airport transfer",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "boat-mechanic",
    "name": "Boat Mechanic",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "engine_service",
        "label": "Engine service",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "winterisation",
        "label": "Winterisation",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "hull_repair_m2",
        "label": "Hull repair",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "marine-electrician",
    "name": "Marine Electrician",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "wiring_repair",
        "label": "Wiring repair",
        "type": "number",
        "unit": "per hour",
        "default": 60
      },
      {
        "key": "nav_light_install",
        "label": "Navigation light install",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "battery_install",
        "label": "Battery install",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "boat-valeter",
    "name": "Boat Valeter",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "small_boat",
        "label": "Small boat valet",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "medium_boat",
        "label": "Medium boat valet",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "antifoul_m2",
        "label": "Antifouling",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "polish_m2",
        "label": "Cut & polish",
        "type": "number",
        "unit": "per m2",
        "default": 15
      }
    ]
  },
  {
    "id": "sail-maker",
    "name": "Sail Maker/Repairer",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "repair_small",
        "label": "Small repair",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "repair_large",
        "label": "Large repair",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "new_sail_m2",
        "label": "New sail",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "uv_strip_m",
        "label": "UV strip replacement",
        "type": "number",
        "unit": "per m",
        "default": 15
      }
    ]
  },
  {
    "id": "marine-surveyor",
    "name": "Marine Surveyor",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "pre_purchase",
        "label": "Pre-purchase survey",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "insurance_survey",
        "label": "Insurance survey",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "damage_survey",
        "label": "Damage survey",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 70
      }
    ]
  },
  {
    "id": "farrier",
    "name": "Farrier",
    "category": "Agriculture",
    "questions": [
      {
        "key": "trim_all_four",
        "label": "Trim (all four)",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "shoe_all_four",
        "label": "Shoe (all four)",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "front_shoes_only",
        "label": "Front shoes only",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "emergency_callout",
        "label": "Emergency call-out",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "fencer-agricultural",
    "name": "Agricultural Fencer",
    "category": "Agriculture",
    "questions": [
      {
        "key": "post_rail_m",
        "label": "Post & rail",
        "type": "number",
        "unit": "per m",
        "default": 15
      },
      {
        "key": "stock_fence_m",
        "label": "Stock fencing",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "electric_fence_m",
        "label": "Electric fencing",
        "type": "number",
        "unit": "per m",
        "default": 5
      },
      {
        "key": "gate_install",
        "label": "Gate install",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 180
      }
    ]
  },
  {
    "id": "tree-planter",
    "name": "Tree Planter",
    "category": "Agriculture",
    "questions": [
      {
        "key": "whip_plant",
        "label": "Whip planting (per tree)",
        "type": "number",
        "unit": "each",
        "default": 3
      },
      {
        "key": "standard_plant",
        "label": "Standard tree plant",
        "type": "number",
        "unit": "each",
        "default": 20
      },
      {
        "key": "hedge_plant_m",
        "label": "Hedge planting",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "mulching_m2",
        "label": "Mulching",
        "type": "number",
        "unit": "per m2",
        "default": 4
      }
    ]
  },
  {
    "id": "land-drainage-specialist",
    "name": "Land Drainage Specialist",
    "category": "Agriculture",
    "questions": [
      {
        "key": "french_drain_m",
        "label": "French drain",
        "type": "number",
        "unit": "per m",
        "default": 25
      },
      {
        "key": "pipe_drain_m",
        "label": "Pipe drainage",
        "type": "number",
        "unit": "per m",
        "default": 18
      },
      {
        "key": "soakaway",
        "label": "Soakaway install",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "pest-controller",
    "name": "Pest Controller",
    "category": "Agriculture",
    "questions": [
      {
        "key": "rat_treatment",
        "label": "Rat treatment",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "wasp_nest",
        "label": "Wasp nest removal",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "mole_catching",
        "label": "Mole catching (per visit)",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "rabbit_control",
        "label": "Rabbit control (per visit)",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "chainsaw-operator",
    "name": "Chainsaw Operator",
    "category": "Agriculture",
    "questions": [
      {
        "key": "tree_felling",
        "label": "Tree felling",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "log_splitting",
        "label": "Log splitting",
        "type": "number",
        "unit": "per hour",
        "default": 35
      },
      {
        "key": "hedge_laying_m",
        "label": "Hedge laying",
        "type": "number",
        "unit": "per m",
        "default": 12
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "welder",
    "name": "Welder",
    "category": "Other Trades",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 45
      },
      {
        "key": "gate_repair",
        "label": "Gate repair",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "railing_m",
        "label": "Railing fabrication",
        "type": "number",
        "unit": "per m",
        "default": 80
      },
      {
        "key": "mobile_callout",
        "label": "Mobile call-out",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "blacksmith",
    "name": "Blacksmith",
    "category": "Other Trades",
    "questions": [
      {
        "key": "gate_per_m",
        "label": "Gate (per metre)",
        "type": "number",
        "unit": "per m",
        "default": 150
      },
      {
        "key": "railing_per_m",
        "label": "Railing (per metre)",
        "type": "number",
        "unit": "per m",
        "default": 120
      },
      {
        "key": "repair_small",
        "label": "Small repair",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "bespoke_hourly",
        "label": "Bespoke work",
        "type": "number",
        "unit": "per hour",
        "default": 60
      }
    ]
  },
  {
    "id": "french-polisher",
    "name": "French Polisher",
    "category": "Other Trades",
    "questions": [
      {
        "key": "table_top",
        "label": "Table top refinish",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "door_refinish",
        "label": "Door refinish",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "chair",
        "label": "Chair refinish",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "per_m2",
        "label": "Surface restoration",
        "type": "number",
        "unit": "per m2",
        "default": 30
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "tv-repair-technician",
    "name": "TV Repair Technician",
    "category": "Other Trades",
    "questions": [
      {
        "key": "diagnostic",
        "label": "Diagnostic fee",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "screen_repair",
        "label": "Screen repair",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "board_repair",
        "label": "Board repair",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      }
    ]
  },
  {
    "id": "piano-tuner",
    "name": "Piano Tuner",
    "category": "Other Trades",
    "questions": [
      {
        "key": "standard_tune",
        "label": "Standard tuning",
        "type": "number",
        "unit": "each",
        "default": 70
      },
      {
        "key": "pitch_raise",
        "label": "Pitch raise",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "regulation",
        "label": "Regulation",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "travel_mile",
        "label": "Travel",
        "type": "number",
        "unit": "per mile",
        "default": 0.5
      }
    ]
  },
  {
    "id": "bookkeeper",
    "name": "Bookkeeper",
    "category": "Other Trades",
    "questions": [
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 25
      },
      {
        "key": "monthly_package",
        "label": "Monthly accounts",
        "type": "number",
        "unit": "per month",
        "default": 150
      },
      {
        "key": "vat_return",
        "label": "VAT return",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "year_end",
        "label": "Year-end accounts",
        "type": "number",
        "unit": "each",
        "default": 300
      }
    ]
  },
  {
    "id": "surveyor",
    "name": "Surveyor",
    "category": "Other Trades",
    "questions": [
      {
        "key": "homebuyer_report",
        "label": "Homebuyer report",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "full_survey",
        "label": "Full structural survey",
        "type": "number",
        "unit": "each",
        "default": 700
      },
      {
        "key": "valuation",
        "label": "Valuation",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 70
      }
    ]
  },
  {
    "id": "asbestos-specialist",
    "name": "Asbestos Specialist",
    "category": "Other Trades",
    "questions": [
      {
        "key": "survey_residential",
        "label": "Residential survey",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "sample_test",
        "label": "Sample testing",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "removal_m2",
        "label": "Removal",
        "type": "number",
        "unit": "per m2",
        "default": 50
      },
      {
        "key": "encapsulation_m2",
        "label": "Encapsulation",
        "type": "number",
        "unit": "per m2",
        "default": 20
      }
    ]
  },
  {
    "id": "furniture-maker",
    "name": "Furniture Maker",
    "category": "Other Trades",
    "questions": [
      {
        "key": "bespoke_table",
        "label": "Bespoke table",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "shelving_unit",
        "label": "Shelving unit",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "cabinet",
        "label": "Custom cabinet",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "picture-framer",
    "name": "Picture Framer",
    "category": "Other Trades",
    "questions": [
      {
        "key": "small_frame",
        "label": "Small frame (up to A4)",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "medium_frame",
        "label": "Medium frame (up to A2)",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "large_frame",
        "label": "Large/custom frame",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "mount_cutting",
        "label": "Mount cutting",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "sewing-alterations",
    "name": "Sewing & Alterations",
    "category": "Other Trades",
    "questions": [
      {
        "key": "hem_trousers",
        "label": "Hem trousers",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "zip_replace",
        "label": "Zip replacement",
        "type": "number",
        "unit": "each",
        "default": 12
      },
      {
        "key": "dress_alteration",
        "label": "Dress alteration",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "curtain_make",
        "label": "Curtain making (per drop)",
        "type": "number",
        "unit": "each",
        "default": 35
      }
    ]
  },
  {
    "id": "carpet-cleaner-specialist",
    "name": "Carpet Cleaner (Specialist)",
    "category": "Cleaning",
    "questions": [
      {
        "key": "room_standard",
        "label": "Standard room",
        "type": "number",
        "unit": "per room",
        "default": 25
      },
      {
        "key": "room_large",
        "label": "Large room",
        "type": "number",
        "unit": "per room",
        "default": 35
      },
      {
        "key": "staircase",
        "label": "Staircase",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "stain_treatment",
        "label": "Stain treatment",
        "type": "number",
        "unit": "each",
        "default": 10
      },
      {
        "key": "sofa_3seat",
        "label": "3-seater sofa",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "computer-repair",
    "name": "Computer Repair Technician",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "diagnostic",
        "label": "Diagnostic",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "virus_removal",
        "label": "Virus removal",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "screen_replace",
        "label": "Screen replacement",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "data_recovery",
        "label": "Data recovery",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      }
    ]
  },
  {
    "id": "phone-repair",
    "name": "Phone Repair Technician",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "screen_replace",
        "label": "Screen replacement",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "battery_replace",
        "label": "Battery replacement",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "charging_port",
        "label": "Charging port repair",
        "type": "number",
        "unit": "each",
        "default": 35
      },
      {
        "key": "water_damage",
        "label": "Water damage repair",
        "type": "number",
        "unit": "each",
        "default": 50
      }
    ]
  },
  {
    "id": "joiner",
    "name": "Joiner",
    "category": "Home Services",
    "questions": [
      {
        "key": "door_frame",
        "label": "Door frame install",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "staircase_m",
        "label": "Staircase (per step)",
        "type": "number",
        "unit": "per step",
        "default": 120
      },
      {
        "key": "skirting_m",
        "label": "Skirting fitting",
        "type": "number",
        "unit": "per m",
        "default": 8
      },
      {
        "key": "architrave_m",
        "label": "Architrave fitting",
        "type": "number",
        "unit": "per m",
        "default": 6
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "window-fitter",
    "name": "Window Fitter",
    "category": "Home Services",
    "questions": [
      {
        "key": "upvc_window",
        "label": "uPVC window",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "sash_window",
        "label": "Sash window",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "patio_door",
        "label": "Patio door",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "composite_door",
        "label": "Composite door supply & fit",
        "type": "number",
        "unit": "each",
        "default": 1200
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "conservatory-installer",
    "name": "Conservatory Installer",
    "category": "Home Services",
    "questions": [
      {
        "key": "lean_to",
        "label": "Lean-to conservatory",
        "type": "number",
        "unit": "each",
        "default": 5000
      },
      {
        "key": "edwardian",
        "label": "Edwardian conservatory",
        "type": "number",
        "unit": "each",
        "default": 8000
      },
      {
        "key": "roof_replacement",
        "label": "Roof replacement",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "staircase-specialist",
    "name": "Staircase Specialist",
    "category": "Home Services",
    "questions": [
      {
        "key": "straight_flight",
        "label": "Straight flight",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "quarter_turn",
        "label": "Quarter-turn staircase",
        "type": "number",
        "unit": "each",
        "default": 2500
      },
      {
        "key": "balustrade_m",
        "label": "Balustrade",
        "type": "number",
        "unit": "per m",
        "default": 80
      },
      {
        "key": "newel_post",
        "label": "Newel post",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "plasterer-dryliner",
    "name": "Dry Liner",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "mf_ceiling_m2",
        "label": "MF ceiling",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "partition_m2",
        "label": "Stud partition",
        "type": "number",
        "unit": "per m2",
        "default": 30
      },
      {
        "key": "insulation_m2",
        "label": "Acoustic insulation",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "swimming-pool-maintenance",
    "name": "Swimming Pool Maintenance",
    "category": "Home Services",
    "questions": [
      {
        "key": "weekly_service",
        "label": "Weekly service",
        "type": "number",
        "unit": "per week",
        "default": 40
      },
      {
        "key": "chemical_treatment",
        "label": "Chemical treatment",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "pump_repair",
        "label": "Pump repair",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "liner_m2",
        "label": "Liner replacement",
        "type": "number",
        "unit": "per m2",
        "default": 25
      }
    ]
  },
  {
    "id": "hot-tub-engineer",
    "name": "Hot Tub Engineer",
    "category": "Home Services",
    "questions": [
      {
        "key": "service",
        "label": "Service",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "chemical_set",
        "label": "Chemical set",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "pump_replace",
        "label": "Pump replacement",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "heater_replace",
        "label": "Heater replacement",
        "type": "number",
        "unit": "each",
        "default": 250
      }
    ]
  },
  {
    "id": "solar-panel-cleaner",
    "name": "Solar Panel Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "per_panel",
        "label": "Per panel clean",
        "type": "number",
        "unit": "each",
        "default": 8
      },
      {
        "key": "system_check",
        "label": "System efficiency check",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "bird_proofing",
        "label": "Bird proofing",
        "type": "number",
        "unit": "each",
        "default": 200
      }
    ]
  },
  {
    "id": "shop-fitter",
    "name": "Shop Fitter",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "counter_m",
        "label": "Counter/display fitting",
        "type": "number",
        "unit": "per m",
        "default": 80
      },
      {
        "key": "partition_m2",
        "label": "Partition wall",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "lighting_install",
        "label": "Lighting install",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "heritage-restoration",
    "name": "Heritage Restoration Specialist",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "stone_repair_m2",
        "label": "Stone repair",
        "type": "number",
        "unit": "per m2",
        "default": 100
      },
      {
        "key": "timber_repair_m",
        "label": "Timber repair",
        "type": "number",
        "unit": "per m",
        "default": 60
      },
      {
        "key": "lime_mortar_m2",
        "label": "Lime mortar repointing",
        "type": "number",
        "unit": "per m2",
        "default": 45
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 280
      }
    ]
  },
  {
    "id": "party-wall-surveyor",
    "name": "Party Wall Surveyor",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "single_notice",
        "label": "Single notice",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "award_preparation",
        "label": "Award preparation",
        "type": "number",
        "unit": "each",
        "default": 1000
      },
      {
        "key": "site_inspection",
        "label": "Site inspection",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 100
      }
    ]
  },
  {
    "id": "acoustic-engineer",
    "name": "Acoustic Engineer",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "sound_test",
        "label": "Sound testing",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "report",
        "label": "Acoustic report",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "soundproofing_m2",
        "label": "Soundproofing install",
        "type": "number",
        "unit": "per m2",
        "default": 60
      },
      {
        "key": "consultation",
        "label": "Consultation",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "thermal-imaging-surveyor",
    "name": "Thermal Imaging Surveyor",
    "category": "Home Services",
    "questions": [
      {
        "key": "residential_survey",
        "label": "Residential survey",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "commercial_survey",
        "label": "Commercial survey",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "report",
        "label": "Detailed report",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "per_image",
        "label": "Per thermal image",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "interior-designer",
    "name": "Interior Designer",
    "category": "Home Services",
    "questions": [
      {
        "key": "room_design",
        "label": "Room design package",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "consultation",
        "label": "Initial consultation",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "full_house",
        "label": "Full house design",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "feng-shui-consultant",
    "name": "Feng Shui Consultant",
    "category": "Home Services",
    "questions": [
      {
        "key": "consultation",
        "label": "Home consultation",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "business_consult",
        "label": "Business consultation",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "room_assessment",
        "label": "Room assessment",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 60
      }
    ]
  },
  {
    "id": "chimney-liner-installer",
    "name": "Chimney Liner Installer",
    "category": "Roofing",
    "questions": [
      {
        "key": "flex_liner_install",
        "label": "Flexible liner install",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "rigid_liner_install",
        "label": "Rigid liner install",
        "type": "number",
        "unit": "each",
        "default": 600
      },
      {
        "key": "cowl_install",
        "label": "Cowl installation",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "inspection",
        "label": "Chimney inspection",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "lightning-conductor-installer",
    "name": "Lightning Conductor Installer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "system_install",
        "label": "System installation",
        "type": "number",
        "unit": "each",
        "default": 1500
      },
      {
        "key": "inspection",
        "label": "Annual inspection",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "repair",
        "label": "Repair",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "certificate",
        "label": "Testing certificate",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "telecoms-engineer",
    "name": "Telecoms Engineer",
    "category": "Electrical & Tech",
    "questions": [
      {
        "key": "line_install",
        "label": "Line installation",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "socket_install",
        "label": "Socket install",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "broadband_setup",
        "label": "Broadband setup",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 45
      }
    ]
  },
  {
    "id": "ice-cream-van",
    "name": "Ice Cream Van Operator",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "event_hire_hour",
        "label": "Event hire (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 80
      },
      {
        "key": "per_serving",
        "label": "Per serving",
        "type": "number",
        "unit": "each",
        "default": 2
      },
      {
        "key": "min_booking",
        "label": "Minimum booking",
        "type": "number",
        "unit": "each",
        "default": 150
      }
    ]
  },
  {
    "id": "mobile-coffee",
    "name": "Mobile Coffee Service",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "event_hire_hour",
        "label": "Event hire (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 60
      },
      {
        "key": "per_cup",
        "label": "Per cup",
        "type": "number",
        "unit": "each",
        "default": 3
      },
      {
        "key": "min_booking",
        "label": "Minimum booking",
        "type": "number",
        "unit": "each",
        "default": 120
      }
    ]
  },
  {
    "id": "bouncy-castle-hire",
    "name": "Bouncy Castle Hire",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "small_castle",
        "label": "Small castle (half day)",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "large_castle",
        "label": "Large castle (half day)",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "full_day",
        "label": "Full day upgrade",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "delivery",
        "label": "Delivery & setup",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "face-painter",
    "name": "Face Painter",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "per_child",
        "label": "Per child",
        "type": "number",
        "unit": "each",
        "default": 5
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      },
      {
        "key": "min_booking",
        "label": "Minimum booking",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "magician",
    "name": "Magician/Entertainer",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "close_up_hour",
        "label": "Close-up magic (per hour)",
        "type": "number",
        "unit": "per hour",
        "default": 150
      },
      {
        "key": "stage_show",
        "label": "Stage show",
        "type": "number",
        "unit": "each",
        "default": 350
      },
      {
        "key": "kids_party",
        "label": "Kids party (1hr)",
        "type": "number",
        "unit": "each",
        "default": 200
      }
    ]
  },
  {
    "id": "beekeeper",
    "name": "Beekeeper",
    "category": "Agriculture",
    "questions": [
      {
        "key": "hive_install",
        "label": "Hive installation",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "swarm_removal",
        "label": "Swarm removal",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "honey_harvest",
        "label": "Honey harvest",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "consultation",
        "label": "Consultation",
        "type": "number",
        "unit": "each",
        "default": 50
      }
    ]
  },
  {
    "id": "dry-stone-waller",
    "name": "Dry Stone Waller",
    "category": "Agriculture",
    "questions": [
      {
        "key": "wall_build_m2",
        "label": "Wall building",
        "type": "number",
        "unit": "per m2",
        "default": 80
      },
      {
        "key": "wall_repair_m",
        "label": "Wall repair",
        "type": "number",
        "unit": "per m",
        "default": 40
      },
      {
        "key": "feature_build",
        "label": "Feature build",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "equine-dentist",
    "name": "Equine Dentist",
    "category": "Agriculture",
    "questions": [
      {
        "key": "routine_rasp",
        "label": "Routine rasp",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "sedation",
        "label": "Sedation (if required)",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "extraction",
        "label": "Tooth extraction",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "mobile-disco",
    "name": "Mobile Disco",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "standard_4hr",
        "label": "Standard package (4hr)",
        "type": "number",
        "unit": "each",
        "default": 250
      },
      {
        "key": "premium_4hr",
        "label": "Premium package (4hr)",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "extra_hour",
        "label": "Extra hour",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "karaoke_addon",
        "label": "Karaoke add-on",
        "type": "number",
        "unit": "each",
        "default": 50
      }
    ]
  },
  {
    "id": "balloon-decorator",
    "name": "Balloon Decorator",
    "category": "Catering & Events",
    "questions": [
      {
        "key": "arch",
        "label": "Balloon arch",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "column",
        "label": "Balloon column",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "table_centrepiece",
        "label": "Table centrepiece",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "garland_m",
        "label": "Balloon garland",
        "type": "number",
        "unit": "per m",
        "default": 20
      }
    ]
  },
  {
    "id": "chimney-builder",
    "name": "Chimney Builder",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "new_chimney",
        "label": "New chimney build",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "chimney_repair",
        "label": "Chimney repair",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "flashing",
        "label": "New flashing",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 250
      }
    ]
  },
  {
    "id": "skip-tracer",
    "name": "Debt Recovery Agent",
    "category": "Other Trades",
    "questions": [
      {
        "key": "per_case",
        "label": "Per case fee",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "commission",
        "label": "Commission (% recovered)",
        "type": "number",
        "unit": "% recovered",
        "default": 10
      },
      {
        "key": "court_filing",
        "label": "Court filing",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "engraver",
    "name": "Engraver",
    "category": "Other Trades",
    "questions": [
      {
        "key": "per_letter",
        "label": "Per letter/character",
        "type": "number",
        "unit": "each",
        "default": 1
      },
      {
        "key": "trophy_engrave",
        "label": "Trophy engraving",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "plaque",
        "label": "Plaque engraving",
        "type": "number",
        "unit": "each",
        "default": 25
      },
      {
        "key": "ring_engrave",
        "label": "Ring engraving",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "leather-worker",
    "name": "Leather Worker",
    "category": "Other Trades",
    "questions": [
      {
        "key": "belt_custom",
        "label": "Custom belt",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "bag_repair",
        "label": "Bag repair",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "wallet_custom",
        "label": "Custom wallet",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 35
      }
    ]
  },
  {
    "id": "mattress-cleaner",
    "name": "Mattress Cleaner",
    "category": "Cleaning",
    "questions": [
      {
        "key": "single",
        "label": "Single mattress",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "double",
        "label": "Double mattress",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "king",
        "label": "King mattress",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "stain_treatment",
        "label": "Stain treatment",
        "type": "number",
        "unit": "each",
        "default": 10
      }
    ]
  },
  {
    "id": "instrument-repairer",
    "name": "Musical Instrument Repairer",
    "category": "Other Trades",
    "questions": [
      {
        "key": "guitar_setup",
        "label": "Guitar setup",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "restring",
        "label": "Restring",
        "type": "number",
        "unit": "each",
        "default": 15
      },
      {
        "key": "piano_repair",
        "label": "Piano repair",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "brass_service",
        "label": "Brass instrument service",
        "type": "number",
        "unit": "each",
        "default": 60
      }
    ]
  },
  {
    "id": "restoration-specialist",
    "name": "Antique Restoration",
    "category": "Other Trades",
    "questions": [
      {
        "key": "furniture_assess",
        "label": "Assessment",
        "type": "number",
        "unit": "each",
        "default": 30
      },
      {
        "key": "small_repair",
        "label": "Small repair",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "full_restoration",
        "label": "Full restoration",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 40
      }
    ]
  },
  {
    "id": "mobile-welder",
    "name": "Mobile Welder",
    "category": "Other Trades",
    "questions": [
      {
        "key": "callout",
        "label": "Call-out fee",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "hourly_rate",
        "label": "Hourly rate",
        "type": "number",
        "unit": "per hour",
        "default": 50
      },
      {
        "key": "gate_repair",
        "label": "Gate repair",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "fabrication_hour",
        "label": "Fabrication",
        "type": "number",
        "unit": "per hour",
        "default": 55
      }
    ]
  },
  {
    "id": "lockout-specialist",
    "name": "Auto Lockout Specialist",
    "category": "Automotive",
    "questions": [
      {
        "key": "car_unlock",
        "label": "Car unlock",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "key_program",
        "label": "Key programming",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "emergency_callout",
        "label": "Emergency call-out",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "key_cut",
        "label": "Key cutting",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "boat-detailer",
    "name": "Boat Detailer",
    "category": "Marine & Boating",
    "questions": [
      {
        "key": "wash_small",
        "label": "Small boat wash",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "wash_large",
        "label": "Large boat wash",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "polish_m2",
        "label": "Cut & polish",
        "type": "number",
        "unit": "per m2",
        "default": 12
      },
      {
        "key": "interior_valet",
        "label": "Interior valet",
        "type": "number",
        "unit": "each",
        "default": 80
      }
    ]
  },
  {
    "id": "scaffolding-inspector",
    "name": "Scaffolding Inspector",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "inspection",
        "label": "Scaffold inspection",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "report",
        "label": "Written report",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "weekly_check",
        "label": "Weekly check",
        "type": "number",
        "unit": "each",
        "default": 40
      }
    ]
  },
  {
    "id": "partition-installer",
    "name": "Partition Installer",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "stud_m2",
        "label": "Stud partition",
        "type": "number",
        "unit": "per m2",
        "default": 35
      },
      {
        "key": "glass_m2",
        "label": "Glass partition",
        "type": "number",
        "unit": "per m2",
        "default": 120
      },
      {
        "key": "door_install",
        "label": "Door in partition",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 220
      }
    ]
  },
  {
    "id": "pebble-dash-specialist",
    "name": "Pebble Dash Specialist",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "apply_m2",
        "label": "Pebble dash application",
        "type": "number",
        "unit": "per m2",
        "default": 40
      },
      {
        "key": "repair_m2",
        "label": "Repair existing",
        "type": "number",
        "unit": "per m2",
        "default": 25
      },
      {
        "key": "removal_m2",
        "label": "Removal",
        "type": "number",
        "unit": "per m2",
        "default": 20
      },
      {
        "key": "day_rate",
        "label": "Day rate",
        "type": "number",
        "unit": "per day",
        "default": 200
      }
    ]
  },
  {
    "id": "bathroom-designer",
    "name": "Bathroom Designer",
    "category": "Home Services",
    "questions": [
      {
        "key": "design_standard",
        "label": "Standard bathroom design",
        "type": "number",
        "unit": "each",
        "default": 200
      },
      {
        "key": "design_luxury",
        "label": "Luxury bathroom design",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "consultation",
        "label": "Initial consultation",
        "type": "number",
        "unit": "each",
        "default": 75
      },
      {
        "key": "3d_render",
        "label": "3D render",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "shed-builder",
    "name": "Shed/Outbuilding Builder",
    "category": "Construction & Building",
    "questions": [
      {
        "key": "standard_shed",
        "label": "Standard shed",
        "type": "number",
        "unit": "each",
        "default": 500
      },
      {
        "key": "workshop",
        "label": "Workshop build",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "summer_house",
        "label": "Summer house",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "base_m2",
        "label": "Concrete base",
        "type": "number",
        "unit": "per m2",
        "default": 50
      }
    ]
  },
  {
    "id": "trampoline-installer",
    "name": "Trampoline Installer",
    "category": "Home Services",
    "questions": [
      {
        "key": "above_ground",
        "label": "Above ground install",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "in_ground",
        "label": "In-ground install",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "safety_net",
        "label": "Safety net fit",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "relocation",
        "label": "Trampoline relocation",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "air-con-installer",
    "name": "Air Conditioning Installer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "split_unit",
        "label": "Split unit install",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "multi_split",
        "label": "Multi-split unit",
        "type": "number",
        "unit": "each",
        "default": 2000
      },
      {
        "key": "service",
        "label": "Annual service",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "regas",
        "label": "Re-gas",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "ventilation-specialist",
    "name": "Ventilation Specialist",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "extractor_install",
        "label": "Extractor fan install",
        "type": "number",
        "unit": "each",
        "default": 80
      },
      {
        "key": "mvhr_install",
        "label": "MVHR system install",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "ducting_m",
        "label": "Ducting",
        "type": "number",
        "unit": "per m",
        "default": 15
      },
      {
        "key": "survey",
        "label": "Ventilation survey",
        "type": "number",
        "unit": "each",
        "default": 100
      }
    ]
  },
  {
    "id": "oil-tank-installer",
    "name": "Oil Tank Installer",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "plastic_tank",
        "label": "Plastic tank install",
        "type": "number",
        "unit": "each",
        "default": 800
      },
      {
        "key": "steel_tank",
        "label": "Steel tank install",
        "type": "number",
        "unit": "each",
        "default": 1200
      },
      {
        "key": "decommission",
        "label": "Tank decommission",
        "type": "number",
        "unit": "each",
        "default": 300
      },
      {
        "key": "fuel_line_m",
        "label": "Fuel line",
        "type": "number",
        "unit": "per m",
        "default": 10
      }
    ]
  },
  {
    "id": "septic-tank-specialist",
    "name": "Septic Tank Specialist",
    "category": "Plumbing & Heating",
    "questions": [
      {
        "key": "emptying",
        "label": "Tank emptying",
        "type": "number",
        "unit": "each",
        "default": 150
      },
      {
        "key": "install",
        "label": "New tank install",
        "type": "number",
        "unit": "each",
        "default": 3000
      },
      {
        "key": "inspection",
        "label": "Inspection",
        "type": "number",
        "unit": "each",
        "default": 100
      },
      {
        "key": "repair",
        "label": "Repair",
        "type": "number",
        "unit": "each",
        "default": 300
      }
    ]
  },
  {
    "id": "wrought-iron-worker",
    "name": "Wrought Iron Worker",
    "category": "Other Trades",
    "questions": [
      {
        "key": "gate_single",
        "label": "Single gate",
        "type": "number",
        "unit": "each",
        "default": 400
      },
      {
        "key": "gate_double",
        "label": "Double gates",
        "type": "number",
        "unit": "each",
        "default": 700
      },
      {
        "key": "railing_m",
        "label": "Railings",
        "type": "number",
        "unit": "per m",
        "default": 100
      },
      {
        "key": "repair",
        "label": "Repair work",
        "type": "number",
        "unit": "per hour",
        "default": 50
      }
    ]
  },
  {
    "id": "clock-repairer",
    "name": "Clock Repairer",
    "category": "Other Trades",
    "questions": [
      {
        "key": "service",
        "label": "Clock service",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "repair_minor",
        "label": "Minor repair",
        "type": "number",
        "unit": "each",
        "default": 40
      },
      {
        "key": "repair_major",
        "label": "Major repair",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "house_call",
        "label": "House call surcharge",
        "type": "number",
        "unit": "each",
        "default": 20
      }
    ]
  },
  {
    "id": "chimney-pot-specialist",
    "name": "Chimney Pot Specialist",
    "category": "Roofing",
    "questions": [
      {
        "key": "pot_supply_fit",
        "label": "Pot supply & fit",
        "type": "number",
        "unit": "each",
        "default": 120
      },
      {
        "key": "pot_repair",
        "label": "Pot repair",
        "type": "number",
        "unit": "each",
        "default": 60
      },
      {
        "key": "cowl_fit",
        "label": "Cowl fitting",
        "type": "number",
        "unit": "each",
        "default": 50
      },
      {
        "key": "scaffold",
        "label": "Scaffolding",
        "type": "number",
        "unit": "each",
        "default": 250
      }
    ]
  }
];

  function getAll() {
    return PROFESSIONS;
  }

  function getById(id) {
    return PROFESSIONS.find(function (p) { return p.id === id; }) || null;
  }

  function search(query) {
    var q = (query || '').toLowerCase();
    if (!q) return PROFESSIONS;
    return PROFESSIONS.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1 ||
             p.category.toLowerCase().indexOf(q) !== -1 ||
             p.id.toLowerCase().indexOf(q) !== -1;
    });
  }

  function getCategories() {
    var cats = [];
    PROFESSIONS.forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    return cats.sort();
  }

  window.Professions = { getAll: getAll, getById: getById, search: search, getCategories: getCategories };
})();