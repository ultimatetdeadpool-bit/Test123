// US State Senators data (2024-2025)
export interface Senator {
  name: string;
  party: string;
  photoUrl: string;
}

export interface StateInfo {
  name: string;
  abbreviation: string;
  flag: string; // emoji flag
  senators: [Senator, Senator];
}

export const stateSenatorData: Record<string, StateInfo> = {
  "01": {
    name: "Alabama",
    abbreviation: "AL",
    flag: "🏴",
    senators: [
      { name: "Katie Britt", party: "R", photoUrl: "/senators/Katie_Britt.jpg" },
      { name: "Tommy Tuberville", party: "R", photoUrl: "/senators/Tommy_Tuberville.jpg" }
    ]
  },
  "02": {
    name: "Alaska",
    abbreviation: "AK",
    flag: "🏴",
    senators: [
      { name: "Lisa Murkowski", party: "R", photoUrl: "/senators/Lisa_Murkowski.jpg" },
      { name: "Dan Sullivan", party: "R", photoUrl: "/senators/Dan_Sullivan.jpg" }
    ]
  },
  "04": {
    name: "Arizona",
    abbreviation: "AZ",
    flag: "🏴",
    senators: [
      { name: "Mark Kelly", party: "D", photoUrl: "/senators/Mark_Kelly.jpg" },
      { name: "Ruben Gallego", party: "D", photoUrl: "/senators/Ruben_Gallego.jpg" }
    ]
  },
  "05": {
    name: "Arkansas",
    abbreviation: "AR",
    flag: "🏴",
    senators: [
      { name: "John Boozman", party: "R", photoUrl: "/senators/John_Boozman.jpg" },
      { name: "Tom Cotton", party: "R", photoUrl: "/senators/Tom_Cotton.jpg" }
    ]
  },
  "06": {
    name: "California",
    abbreviation: "CA",
    flag: "🏴",
    senators: [
      { name: "Alex Padilla", party: "D", photoUrl: "/senators/Alex_Padilla.jpg" },
      { name: "Adam Schiff", party: "D", photoUrl: "/senators/Adam_Schiff.jpg" }
    ]
  },
  "08": {
    name: "Colorado",
    abbreviation: "CO",
    flag: "🏴",
    senators: [
      { name: "Michael Bennet", party: "D", photoUrl: "/senators/Michael_Bennet.jpg" },
      { name: "John Hickenlooper", party: "D", photoUrl: "/senators/John_Hickenlooper.jpg" }
    ]
  },
  "09": {
    name: "Connecticut",
    abbreviation: "CT",
    flag: "🏴",
    senators: [
      { name: "Richard Blumenthal", party: "D", photoUrl: "/senators/Richard_Blumenthal.jpg" },
      { name: "Chris Murphy", party: "D", photoUrl: "/senators/Chris_Murphy.jpg" }
    ]
  },
  "10": {
    name: "Delaware",
    abbreviation: "DE",
    flag: "🏴",
    senators: [
      { name: "Lisa Blunt Rochester", party: "D", photoUrl: "/senators/Lisa_Blunt_Rochester.jpg" },
      { name: "Chris Coons", party: "D", photoUrl: "/senators/Chris_Coons.jpg" }
    ]
  },
  "12": {
    name: "Florida",
    abbreviation: "FL",
    flag: "🏴",
    senators: [
      { name: "Marco Rubio", party: "R", photoUrl: "/senators/Marco_Rubio.jpg" },
      { name: "Rick Scott", party: "R", photoUrl: "/senators/Rick_Scott.jpg" }
    ]
  },
  "13": {
    name: "Georgia",
    abbreviation: "GA",
    flag: "🏴",
    senators: [
      { name: "Jon Ossoff", party: "D", photoUrl: "/senators/Jon_Ossoff.jpg" },
      { name: "Raphael Warnock", party: "D", photoUrl: "/senators/Raphael_Warnock.jpg" }
    ]
  },
  "15": {
    name: "Hawaii",
    abbreviation: "HI",
    flag: "🏴",
    senators: [
      { name: "Brian Schatz", party: "D", photoUrl: "/senators/Brian_Schatz.jpg" },
      { name: "Mazie Hirono", party: "D", photoUrl: "/senators/Mazie_Hirono.jpg" }
    ]
  },
  "16": {
    name: "Idaho",
    abbreviation: "ID",
    flag: "🏴",
    senators: [
      { name: "Mike Crapo", party: "R", photoUrl: "/senators/Mike_Crapo.jpg" },
      { name: "Jim Risch", party: "R", photoUrl: "/senators/Jim_Risch.jpg" }
    ]
  },
  "17": {
    name: "Illinois",
    abbreviation: "IL",
    flag: "🏴",
    senators: [
      { name: "Dick Durbin", party: "D", photoUrl: "/senators/Dick_Durbin.jpg" },
      { name: "Tammy Duckworth", party: "D", photoUrl: "/senators/Tammy_Duckworth.jpg" }
    ]
  },
  "18": {
    name: "Indiana",
    abbreviation: "IN",
    flag: "🏴",
    senators: [
      { name: "Todd Young", party: "R", photoUrl: "/senators/Todd_Young.jpg" },
      { name: "Jim Banks", party: "R", photoUrl: "/senators/Jim_Banks.jpg" }
    ]
  },
  "19": {
    name: "Iowa",
    abbreviation: "IA",
    flag: "🏴",
    senators: [
      { name: "Chuck Grassley", party: "R", photoUrl: "/senators/Chuck_Grassley.jpg" },
      { name: "Joni Ernst", party: "R", photoUrl: "/senators/Joni_Ernst.jpg" }
    ]
  },
  "20": {
    name: "Kansas",
    abbreviation: "KS",
    flag: "🏴",
    senators: [
      { name: "Jerry Moran", party: "R", photoUrl: "/senators/Jerry_Moran.jpg" },
      { name: "Roger Marshall", party: "R", photoUrl: "/senators/Roger_Marshall.jpg" }
    ]
  },
  "21": {
    name: "Kentucky",
    abbreviation: "KY",
    flag: "🏴",
    senators: [
      { name: "Mitch McConnell", party: "R", photoUrl: "/senators/Mitch_McConnell.jpg" },
      { name: "Rand Paul", party: "R", photoUrl: "/senators/Rand_Paul.jpg" }
    ]
  },
  "22": {
    name: "Louisiana",
    abbreviation: "LA",
    flag: "🏴",
    senators: [
      { name: "Bill Cassidy", party: "R", photoUrl: "/senators/Bill_Cassidy.jpg" },
      { name: "John Kennedy", party: "R", photoUrl: "/senators/John_Kennedy.jpg" }
    ]
  },
  "23": {
    name: "Maine",
    abbreviation: "ME",
    flag: "🏴",
    senators: [
      { name: "Susan Collins", party: "R", photoUrl: "/senators/Susan_Collins.jpg" },
      { name: "Angus King", party: "I", photoUrl: "/senators/Angus_King.jpg" }
    ]
  },
  "24": {
    name: "Maryland",
    abbreviation: "MD",
    flag: "🏴",
    senators: [
      { name: "Angela Alsobrooks", party: "D", photoUrl: "/senators/Angela_Alsobrooks.jpg" },
      { name: "Chris Van Hollen", party: "D", photoUrl: "/senators/Chris_Van_Hollen.jpg" }
    ]
  },
  "25": {
    name: "Massachusetts",
    abbreviation: "MA",
    flag: "🏴",
    senators: [
      { name: "Elizabeth Warren", party: "D", photoUrl: "/senators/Elizabeth_Warren.jpg" },
      { name: "Ed Markey", party: "D", photoUrl: "/senators/Ed_Markey.jpg" }
    ]
  },
  "26": {
    name: "Michigan",
    abbreviation: "MI",
    flag: "🏴",
    senators: [
      { name: "Elissa Slotkin", party: "D", photoUrl: "/Representatives/Elissa_Slotkin.jpg" },
      { name: "Gary Peters", party: "D", photoUrl: "/senators/Gary_Peters.jpg" }
    ]
  },
  "27": {
    name: "Minnesota",
    abbreviation: "MN",
    flag: "🏴",
    senators: [
      { name: "Amy Klobuchar", party: "D", photoUrl: "/senators/Amy_Klobuchar.jpg" },
      { name: "Tina Smith", party: "D", photoUrl: "/senators/Tina_Smith.jpg" }
    ]
  },
  "28": {
    name: "Mississippi",
    abbreviation: "MS",
    flag: "🏴",
    senators: [
      { name: "Roger Wicker", party: "R", photoUrl: "/senators/Roger_Wicker.jpg" },
      { name: "Cindy Hyde-Smith", party: "R", photoUrl: "/senators/Cindy_Hyde-Smith.jpg" }
    ]
  },
  "29": {
    name: "Missouri",
    abbreviation: "MO",
    flag: "🏴",
    senators: [
      { name: "Josh Hawley", party: "R", photoUrl: "/senators/Josh_Hawley.jpg" },
      { name: "Eric Schmitt", party: "R", photoUrl: "/senators/Eric_Schmitt.jpg" }
    ]
  },
  "30": {
    name: "Montana",
    abbreviation: "MT",
    flag: "🏴",
    senators: [
      { name: "Tim Sheehy", party: "R", photoUrl: "/senators/Tim_Sheehy.jpg" },
      { name: "Steve Daines", party: "R", photoUrl: "/senators/Steve_Daines.jpg" }
    ]
  },
  "31": {
    name: "Nebraska",
    abbreviation: "NE",
    flag: "🏴",
    senators: [
      { name: "Deb Fischer", party: "R", photoUrl: "/senators/Deb_Fischer.jpg" },
      { name: "Pete Ricketts", party: "R", photoUrl: "/senators/Pete_Ricketts.jpg" }
    ]
  },
  "32": {
    name: "Nevada",
    abbreviation: "NV",
    flag: "🏴",
    senators: [
      { name: "Catherine Cortez Masto", party: "D", photoUrl: "/senators/Catherine_CortezMasto.jpg" },
      { name: "Jacky Rosen", party: "D", photoUrl: "/senators/Jacky_Rosen.jpg" }
    ]
  },
  "33": {
    name: "New Hampshire",
    abbreviation: "NH",
    flag: "🏴",
    senators: [
      { name: "Jeanne Shaheen", party: "D", photoUrl: "/senators/Jeanne_Shaheen.jpg" },
      { name: "Maggie Hassan", party: "D", photoUrl: "/senators/Maggie_Hassan.jpg" }
    ]
  },
  "34": {
    name: "New Jersey",
    abbreviation: "NJ",
    flag: "🏴",
    senators: [
      { name: "Cory Booker", party: "D", photoUrl: "/senators/Cory_Booker.jpg" },
      { name: "Andy Kim", party: "D", photoUrl: "/senators/Andy_Kim.jpg" }
    ]
  },
  "35": {
    name: "New Mexico",
    abbreviation: "NM",
    flag: "🏴",
    senators: [
      { name: "Martin Heinrich", party: "D", photoUrl: "/senators/Martin_Heinrich.jpg" },
      { name: "Ben Ray Luján", party: "D", photoUrl: "/senators/BenRay_Lujan.jpg" }
    ]
  },
  "36": {
    name: "New York",
    abbreviation: "NY",
    flag: "🏴",
    senators: [
      { name: "Chuck Schumer", party: "D", photoUrl: "/senators/Chuck_Schumer.jpg" },
      { name: "Kirsten Gillibrand", party: "D", photoUrl: "/senators/Kirsten_Gillibrand.jpg" }
    ]
  },
  "37": {
    name: "North Carolina",
    abbreviation: "NC",
    flag: "🏴",
    senators: [
      { name: "Thom Tillis", party: "R", photoUrl: "/senators/Thom_Tillis.jpg" },
      { name: "Ted Budd", party: "R", photoUrl: "/senators/Ted_Budd.jpg" }
    ]
  },
  "38": {
    name: "North Dakota",
    abbreviation: "ND",
    flag: "🏴",
    senators: [
      { name: "John Hoeven", party: "R", photoUrl: "/senators/John_Hoeven.jpg" },
      { name: "Kevin Cramer", party: "R", photoUrl: "/senators/Kevin_Cramer.jpg" }
    ]
  },
  "39": {
    name: "Ohio",
    abbreviation: "OH",
    flag: "🏴",
    senators: [
      { name: "Bernie Moreno", party: "R", photoUrl: "/senators/Bernie_Moreno.jpg" },
      { name: "Jon Husted", party: "R", photoUrl: "/senators/Jon_Husted.jpg" }
    ]
  },
  "40": {
    name: "Oklahoma",
    abbreviation: "OK",
    flag: "🏴",
    senators: [
      { name: "James Lankford", party: "R", photoUrl: "/senators/James_Lankford.jpg" },
      { name: "Markwayne Mullin", party: "R", photoUrl: "/senators/Markwayne_Mullin.jpg" }
    ]
  },
  "41": {
    name: "Oregon",
    abbreviation: "OR",
    flag: "🏴",
    senators: [
      { name: "Ron Wyden", party: "D", photoUrl: "/senators/Ron_Wyden.jpg" },
      { name: "Jeff Merkley", party: "D", photoUrl: "/senators/Jeff_Merkley.jpg" }
    ]
  },
  "42": {
    name: "Pennsylvania",
    abbreviation: "PA",
    flag: "🏴",
    senators: [
      { name: "Dave McCormick", party: "R", photoUrl: "/senators/Dave_McCormick.jpg" },
      { name: "John Fetterman", party: "D", photoUrl: "/senators/John_Fetterman.jpg" }
    ]
  },
  "44": {
    name: "Rhode Island",
    abbreviation: "RI",
    flag: "🏴",
    senators: [
      { name: "Jack Reed", party: "D", photoUrl: "/senators/Jack_Reed.jpg" },
      { name: "Sheldon Whitehouse", party: "D", photoUrl: "/senators/Sheldon_Whitehouse.jpg" }
    ]
  },
  "45": {
    name: "South Carolina",
    abbreviation: "SC",
    flag: "🏴",
    senators: [
      { name: "Lindsey Graham", party: "R", photoUrl: "/senators/Lindsey_Graham.jpg" },
      { name: "Tim Scott", party: "R", photoUrl: "/senators/Tim_Scott.jpg" }
    ]
  },
  "46": {
    name: "South Dakota",
    abbreviation: "SD",
    flag: "🏴",
    senators: [
      { name: "John Thune", party: "R", photoUrl: "/senators/John_Thune.jpg" },
      { name: "Mike Rounds", party: "R", photoUrl: "/senators/Mike_Rounds.jpg" }
    ]
  },
  "47": {
    name: "Tennessee",
    abbreviation: "TN",
    flag: "🏴",
    senators: [
      { name: "Marsha Blackburn", party: "R", photoUrl: "/senators/Marsha_Blackburn.jpg" },
      { name: "Bill Hagerty", party: "R", photoUrl: "/senators/Bill_Hagerty.jpg" }
    ]
  },
  "48": {
    name: "Texas",
    abbreviation: "TX",
    flag: "🏴",
    senators: [
      { name: "John Cornyn", party: "R", photoUrl: "/senators/John_Cornyn.jpg" },
      { name: "Ted Cruz", party: "R", photoUrl: "/senators/Ted_Cruz.jpg" }
    ]
  },
  "49": {
    name: "Utah",
    abbreviation: "UT",
    flag: "🏴",
    senators: [
      { name: "Mike Lee", party: "R", photoUrl: "/senators/Mike_Lee.jpg" },
      { name: "John Curtis", party: "R", photoUrl: "/senators/John_Curtis.jpg" }
    ]
  },
  "50": {
    name: "Vermont",
    abbreviation: "VT",
    flag: "🏴",
    senators: [
      { name: "Bernie Sanders", party: "I", photoUrl: "/senators/Bernie_Sanders.jpg" },
      { name: "Peter Welch", party: "D", photoUrl: "/senators/Peter_Welch.jpg" }
    ]
  },
  "51": {
    name: "Virginia",
    abbreviation: "VA",
    flag: "🏴",
    senators: [
      { name: "Mark Warner", party: "D", photoUrl: "/senators/Mark_Warner.jpg" },
      { name: "Tim Kaine", party: "D", photoUrl: "/senators/Tim_Kaine.jpg" }
    ]
  },
  "53": {
    name: "Washington",
    abbreviation: "WA",
    flag: "🏴",
    senators: [
      { name: "Patty Murray", party: "D", photoUrl: "/senators/Patty_Murray.jpg" },
      { name: "Maria Cantwell", party: "D", photoUrl: "/senators/Maria_Cantwell.jpg" }
    ]
  },
  "54": {
    name: "West Virginia",
    abbreviation: "WV",
    flag: "🏴",
    senators: [
      { name: "Jim Justice", party: "R", photoUrl: "/senators/Jim_Justice.jpg" },
      { name: "Shelley Moore Capito", party: "R", photoUrl: "/senators/ShelleyMoore_Capito.jpg" }
    ]
  },
  "55": {
    name: "Wisconsin",
    abbreviation: "WI",
    flag: "🏴",
    senators: [
      { name: "Ron Johnson", party: "R", photoUrl: "/senators/Ron_Johnson.jpg" },
      { name: "Tammy Baldwin", party: "D", photoUrl: "/senators/Tammy_Baldwin.jpg" }
    ]
  },
  "56": {
    name: "Wyoming",
    abbreviation: "WY",
    flag: "🏴",
    senators: [
      { name: "John Barrasso", party: "R", photoUrl: "/senators/John_Barrasso.jpg" },
      { name: "Cynthia Lummis", party: "R", photoUrl: "/senators/Cynthia_Lummis.jpg" }
    ]
  }
};