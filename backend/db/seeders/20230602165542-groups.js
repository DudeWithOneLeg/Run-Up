'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Groups'

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const validGroup = [
    {
      organizerId: 1,
      name: 'Moonwalkers United',
      about: 'A group of runners who glide effortlessly through their routes, mimicking the iconic moonwalk move popularized by Michael Jackson. Their smooth and graceful running style sets them apart as they create an illusion of dancing on the pavement.',
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Thriller Runners',
      about: "Join this spine-tingling running group if you're up for an exhilarating and suspenseful workout experience. With thrilling challenges and mysterious routes, they'll keep you on the edge of your running shoes, just like the excitement of watching MJ's 'Thriller' music video.",
      type: 'In person',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Smooth Criminal Striders',
      about: 'A suave and sophisticated running crew, the Smooth Criminal Striders boast impeccable form and seamless strides. Their aim is to master the art of running with criminal precision while looking sharp and stylish.',
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Beat It Pacers',
      about: "This group knows how to set the pace and leave their competition in the dust. Channeling the energy and rhythm of Michael Jackson's 'Beat It,' they lead the way, motivating others to step up their running game.",
      type: 'In person',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Billie Jean Sprinters',
      about: 'For those who believe in giving their all during sprints, the Billie Jean Sprinters group is the place to be. With dedication and passion, they light up the track like the famous illuminated floor in the "Billie Jean" music video.',
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: "Don't Stop 'til You Drop Joggernauts",
      about: "This enthusiastic bunch takes Michael Jackson's 'Don't Stop 'Til You Get Enough' as their mantra, pushing themselves to the limit with relentless energy and determination. They thrive on long-distance challenges and embrace the joy of running non-stop.",
      type: 'In person',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Rock with You Racers',
      about: "Energetic and full of life, the Rock with You Racers group creates a running party atmosphere. They believe that running should be enjoyable and aim to bring people together through the love of fitness and Michael Jackson's timeless tunes.",
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Bad to the Finish Line',
      about: "This group is all about defying the odds and overcoming obstacles. Emulating the rebellious spirit of MJ's 'Bad' music video, they encourage each other to conquer tough terrains and reach the finish line with confidence.",
      type: 'In person',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'Wanna Be Starting Racers',
      about: "For those new to running or looking to start fresh, the Wanna Be Starting Racers offer a supportive and encouraging community. Inspired by the enthusiasm of Michael Jackson's 'Wanna Be Startin' Somethin','' they motivate each other to begin their running journey and never give up.",
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 1,
      name: 'P.Y.T. (Pretty Young Tracksters)',
      about: "Whether you're a seasoned marathoner or a beginner taking your first strides, the P.Y.T. Tracksters embrace everyone with open arms. They believe in nurturing a supportive and inclusive environment, where each member is encouraged to unleash their inner P.Y.T. and push their limits while having fun.",
      type: 'Online',
      private: false,
      city: 'Houston',
      state: 'Texas'
    },
    {
      organizerId: 2,
      name: 'Dunder Mifflin Dashers',
      about: "Welcome to the Dunder Mifflin Dashers! We may not be paper salespeople, but we know how to run! Join us for hilarious runs, Scranton-style. Our races involve staple dodging, paper airplane relays, and Dundie awards for the winners. No need for a carpool to get to our events; just walk to the annex, and we'll be there!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: "Scott's Tots Trotters",
      about: "Scott's Tots Trotters is the running group where Michael Scott fulfills his promise to provide college scholarships! Okay, maybe not, but we're still full of enthusiasm and dedication. Our runs involve dance-offs, lip-sync battles, and a 'That's What She Said' joke at every mile marker. Join us for an unforgettable running experience!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: 'Whistleblower Whizzers',
      about: "At Whistleblower Whizzers, we value integrity, just like Michael Scott. We're not afraid to blow the whistle on boring runs! Our whistle-filled routes will have you laughing all the way to the finish line. Expect prankster pacers, 'Parkour!' challenges, and a lot of 'That's What She Said' signs along the way!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: "Michael's Misfit Milers",
      about: "Join Michael's Misfit Milers, where everyone is a World's Best Boss! We embrace diversity, humor, and running enthusiasm. Our runs include 'Fun Run' games, improv comedy sprints, and a Pretzel Day celebration at the finish line. Come run with us and see how we turn every mile into a party!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: "That's What She Said Striders",
      about: "The 'That's What She Said' Striders are the masters of witty banter and hilarious running quotes. Whether it's a 'That's What She Said' water station or a 'Bears, Beets, Battlestar Galactica' relay, we know how to bring the laughs to every run. Join us for a running experience that'll have you quoting Michael Scott!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: "Michael's Dundie Dashers",
      about: "You deserve a Dundie, and we've got the running group for you! Michael's Dundie Dashers celebrate every run with Dundie awards for categories like 'Fastest Paper Airplane Throw' and 'Best Impersonation of a Regional Manager.' Our races are full of surprises, just like a Dundie ceremony!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: 'Serenity by Jan Sprinters',
      about: "Looking for a running group with a touch of romance and a whole lot of candlelight? Look no further than Serenity by Jan Sprinters! Our runs are inspired by Jan Levinson's most memorable moments, from a 'Hunter the Songbird' playlist to a candlelit 'Dinner Party' run. You'll love every step!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: 'Prison Mike Pacers',
      about: "Attention, all runners! We have an exciting group here: the Prison Mike Pacers! Our runs involve improv comedy, Dementors (metaphorical ones, of course), and a special appearance by Prison Mike himself. Come join us, and don't forget to bring your purple bandana!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: 'Threat Level Midnight Marathoners',
      about: "Calling all secret agents and spy enthusiasts! The Threat Level Midnight Marathoners is your chance to run like you're in a Michael Scott action film. Our running routes involve spy challenges, evil plot twists, and a surprise celebrity cameo at the finish line. Get ready for a marathon of laughs and intrigue!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 2,
      name: 'Michael\'s World\'s Best Boss Joggers',
      about: "You've heard the stories, and now you can experience it for yourself. Michael's World's Best Boss Joggers welcome runners of all abilities. From a 'Take Your Daughter to Work Day' fun run to 'Prank the Accountant' relays, we've got the most memorable running events in Scranton!",
      type: 'In-Person',
      private: false,
      city: 'Scranton',
      state: 'Pennsylvania'
    },
    {
      organizerId: 3,
      name: "Leo's Oscar Racers",
      about: "Welcome to Leo's Oscar Racers, where we're chasing more than just trophies! Our runs are inspired by Leo's iconic movies, and we'll run through the streets like we're escaping from a bear or racing the Titanic! Join us for award-winning fun and epic adventures.",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 3,
      name: "The Revenant Runners",
      about: "Join The Revenant Runners and experience the thrill of surviving the wild like Leo did! Our trail runs are full of challenges and breathtaking views. Don't worry; we won't leave you to fend for yourself, but we will test your endurance and determination!",
      type: "In-Person",
      private: false,
      city: "Denver",
      state: "Colorado"
    },
    {
      organizerId: 3,
      name: "Gatsby's Glamorous Sprinters",
      about: "Step back in time with Gatsby's Glamorous Sprinters! We're running like it's the roaring '20s, complete with flapper outfits and jazz music. Our Gatsby-themed races are full of elegance and excitement. You're guaranteed a Great Gatsby-style party at the finish line!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 3,
      name: "Leo's Wolf Pack",
      about: "Join Leo's Wolf Pack, where we run with the spirit of the wolf! Our trail runs are all about connecting with nature and embracing the wild side. No worries; there won't be any revenants here, just good company and exhilarating runs!",
      type: "In-Person",
      private: false,
      city: "Seattle",
      state: "Washington"
    },
    {
      organizerId: 3,
      name: "Titanic Trotters",
      about: "Embark on an unforgettable running journey with the Titanic Trotters! Our scenic runs follow Leo's legendary voyage on the Titanic. But don't worry, we'll make sure the runs have a happy ending! Get ready for an epic adventure and beautiful ocean views.",
      type: "In-Person",
      private: false,
      city: "Southampton",
      state: "United Kingdom"
    },
    {
      organizerId: 3,
      name: "Leo's Movie Marathoners",
      about: "At Leo's Movie Marathoners, we run through the plots of Leo's best movies! Join us for the Wolf of Wall Street Hustle, The Aviator Relay, and the Catch Me If You Can Sprint. Let's recreate Leo's on-screen adventures together!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 3,
      name: "Once Upon a Run in Hollywood",
      about: "Step into the world of Quentin Tarantino with Once Upon a Run in Hollywood! Our runs are a mix of action, suspense, and plenty of movie references. Prepare for exciting routes and an Oscars-themed after-party!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 3,
      name: "Leo's Green Initiators",
      about: "At Leo's Green Initiators, we run with a purpose—to raise awareness for environmental causes. Our eco-friendly runs focus on sustainability, clean-up efforts, and appreciating nature's beauty. Let's make the world a greener place, one run at a time!",
      type: "In-Person",
      private: false,
      city: "San Francisco",
      state: "California"
    },
    {
      organizerId: 3,
      name: "Shutter Island Sprinters",
      about: "Dive into the mysteries of Shutter Island with Leo himself! Our island-themed runs include thrilling twists and turns. Don't worry; it's all fun and games, and no one will lose their minds during the race!",
      type: "In-Person",
      private: false,
      city: "Boston",
      state: "Massachusetts"
    },
    {
      organizerId: 3,
      name: "Inception Pacers",
      about: "Get ready for mind-bending runs with Inception Pacers! Our dream-themed races will challenge your perception of reality. You'll experience gravity-defying routes and a spinning-top finish line to keep things exciting!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 4,
      name: "Jen's Catching Fire Sprinters",
      about: "Welcome to Jen's Catching Fire Sprinters! Our runs are inspired by the Hunger Games, and you'll feel like a tribute racing through the Capitol. Join us for thrilling routes, archery challenges, and a victory feast at the finish line. May the odds be ever in your favor!",
      type: "In-Person",
      private: false,
      city: "Panem",
      state: "District 12"
    },
    {
      organizerId: 4,
      name: "Mystique's Shape-shifters",
      about: "At Mystique's Shape-shifters, we embrace change and variety in our runs, just like Mystique from X-Men. Our routes are full of surprises, and you never know which path you'll take. Join us for a running experience that's as dynamic as Jennifer's movie roles!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 4,
      name: "Silver Linings Pacers",
      about: "Running is our silver lining, and you're invited to join us! The Silver Linings Pacers focus on positivity and mental well-being during our runs. Our routes feature uplifting scenery, dance breaks, and happy endings—just like Jennifer's feel-good movies!",
      type: "In-Person",
      private: false,
      city: "Philadelphia",
      state: "Pennsylvania"
    },
    {
      organizerId: 4,
      name: "Jen's Mockingjay Flyers",
      about: "Calling all rebels and Mockingjays! Jen's Mockingjay Flyers are a group dedicated to social causes and making a difference. Our runs raise awareness for various charities and movements. Together, we'll fly high and change the world!",
      type: "In-Person",
      private: false,
      city: "Washington, D.C.",
      state: "District of Columbia"
    },
    {
      organizerId: 4,
      name: "Hollywood Starlets",
      about: "Join the Hollywood Starlets for a taste of glamour and fame! Our runs are inspired by Jennifer's red carpet moments and movie premieres. Expect paparazzi-style photographers, autograph stations, and VIP treatment at the finish line!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 4,
      name: "J-Law's Lawrence Sprinters",
      about: "J-Law's Lawrence Sprinters is the running group for everyone who loves a bit of clumsiness and charm! Our runs are filled with light-hearted moments, unexpected falls (just like at the Oscars), and joyful camaraderie. Let's sprint like no one's watching!",
      type: "In-Person",
      private: false,
      city: "Louisville",
      state: "Kentucky"
    },
    {
      organizerId: 4,
      name: "Winter's Bone Racers",
      about: "Step into the world of Winter's Bone with our rugged trail runs! Our group celebrates the raw beauty of nature and the determination of Jennifer's characters. Expect challenging terrains, bonfires, and a rustic barbecue after the race.",
      type: "In-Person",
      private: false,
      city: "Ozarks",
      state: "Missouri"
    },
    {
      organizerId: 4,
      name: "Joy's Entrepreneurs",
      about: "Inspired by the movie 'Joy,' our running group is all about innovation and success. Joy's Entrepreneurs are driven to achieve greatness on the tracks and in their lives. Join us for runs that spark creativity and determination!",
      type: "In-Person",
      private: false,
      city: "Boston",
      state: "Massachusetts"
    },
    {
      organizerId: 4,
      name: "Jen's American Hustlers",
      about: "Get ready for some hustle and running flair! Jen's American Hustlers are all about the fast-paced life and energizing runs. Our routes showcase the vibrant streets of big cities and the thrill of the con. Let's run like we've got a million-dollar deal to close!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 4,
      name: "Passengers Adventurers",
      about: "Embark on a cosmic journey with the Passengers Adventurers! Our runs take inspiration from Jennifer's sci-fi movie 'Passengers.' Expect futuristic-themed routes, stargazing opportunities, and a space-age after-party!",
      type: "In-Person",
      private: false,
      city: "Houston",
      state: "Texas"
    },
    {
      organizerId: 5,
      name: "Pirates of the Caribbean Runners",
      about: "Ahoy, mateys! Join the Pirates of the Caribbean Runners for swashbuckling adventures. Our runs are inspired by Johnny Depp's iconic Captain Jack Sparrow. Expect treasure hunts, pirate-themed obstacles, and a hearty pirate feast at the finish line!",
      type: "In-Person",
      private: false,
      city: "Tortuga",
      state: "Caribbean Sea"
    },
    {
      organizerId: 5,
      name: "Edward's Scissor Sprinters",
      about: "Ready for a cutting-edge running experience? Edward's Scissor Sprinters embrace creativity and uniqueness in our runs, just like Johnny Depp's character in 'Edward Scissorhands.' Join us for artsy routes and topiary challenges!",
      type: "In-Person",
      private: false,
      city: "Tim Burton's World",
      state: "Fantasyland"
    },
    {
      organizerId: 5,
      name: "Fear and Loathing Roadsters",
      about: "Enter the realm of gonzo journalism with Fear and Loathing Roadsters! Our runs are wild rides inspired by Johnny Depp's role in 'Fear and Loathing in Las Vegas.' Expect psychedelic-themed routes and a surreal after-party!",
      type: "In-Person",
      private: false,
      city: "Las Vegas",
      state: "Nevada"
    },
    {
      organizerId: 5,
      name: "Mad Hatter's Marathoners",
      about: "Curiouser and curiouser! The Mad Hatter's Marathoners invite you to a whimsical running adventure. Inspired by Johnny Depp's portrayal of the Mad Hatter in 'Alice in Wonderland,' our routes will take you on a journey through Wonderland!",
      type: "In-Person",
      private: false,
      city: "Wonderland",
      state: "Imagination"
    },
    {
      organizerId: 5,
      name: "Dark Shadows Dashers",
      about: "Welcome to the world of Dark Shadows Dashers, where we celebrate the supernatural and the mysterious. Our runs are inspired by Johnny Depp's role in 'Dark Shadows.' Expect gothic-themed routes and an eerie finish line celebration!",
      type: "In-Person",
      private: false,
      city: "Collinsport",
      state: "Maine"
    },
    {
      organizerId: 5,
      name: "Tonto's Trailblazers",
      about: "Join Tonto's Trailblazers for runs that honor Native American culture and history. Our routes pay tribute to Johnny Depp's portrayal of Tonto in 'The Lone Ranger.' Get ready for scenic trails and a Native-inspired feast at the finish!",
      type: "In-Person",
      private: false,
      city: "Comanche Territory",
      state: "Texas"
    },
    {
      organizerId: 5,
      name: "Sweeney Todd's Razors",
      about: "Attend the tale of Sweeney Todd's Razors! Our runs are a blend of dark humor and macabre themes inspired by Johnny Depp's role in 'Sweeney Todd: The Demon Barber of Fleet Street.' Beware of the meat pie station at the end!",
      type: "In-Person",
      private: false,
      city: "London",
      state: "England"
    },
    {
      organizerId: 5,
      name: "Chocolat Chasers",
      about: "For all the chocolate lovers out there, the Chocolat Chasers are here! Inspired by Johnny Depp's role in 'Chocolat,' our runs feature sweet-themed routes and a delightful chocolate buffet at the finish line. Join us for a delectable running experience!",
      type: "In-Person",
      private: false,
      city: "Lansquenet-sous-Tannes",
      state: "France"
    },
    {
      organizerId: 5,
      name: "The Tourist Trekkers",
      about: "Embark on a globetrotting adventure with The Tourist Trekkers! Inspired by Johnny Depp's role in 'The Tourist,' our runs take you through exotic locations and offer a taste of international cuisine at the finish line!",
      type: "In-Person",
      private: false,
      city: "Venice",
      state: "Italy"
    },
    {
      organizerId: 5,
      name: "Cry-Baby Racers",
      about: "Get ready to race with the Cry-Baby Racers, where we embrace rockabilly style and rebel spirit! Inspired by Johnny Depp's role in 'Cry-Baby,' our runs feature a classic car show, live music, and a dance-off party at the end!",
      type: "In-Person",
      private: false,
      city: "Baltimore",
      state: "Maryland"
    },
    {
      organizerId: 6,
      name: "Mamma Mia! Milers",
      about: "Dancing queens and kings, get ready to run with the Mamma Mia! Milers! Our runs are inspired by Meryl Streep's role in 'Mamma Mia!' Expect ABBA-themed routes, musical sing-alongs, and a Mediterranean feast at the finish line!",
      type: "In-Person",
      private: false,
      city: "Kalokairi",
      state: "Greek Islands"
    },
    {
      organizerId: 6,
      name: "The Iron Lady Pacers",
      about: "Join The Iron Lady Pacers for strong and determined runs, just like Meryl Streep's portrayal of Margaret Thatcher. Our routes are politically charged, and we encourage discussions on important social issues. Let's empower each other on the tracks!",
      type: "In-Person",
      private: false,
      city: "London",
      state: "England"
    },
    {
      organizerId: 6,
      name: "Julia and Julia's Joggers",
      about: "Step into the world of Julia Child and Julia Powell with Julia and Julia's Joggers! Our runs celebrate the love for cooking, delicious food, and culinary delights, just like Meryl Streep's role in 'Julie & Julia.'",
      type: "In-Person",
      private: false,
      city: "Paris",
      state: "France"
    },
    {
      organizerId: 6,
      name: "The Devil Wears Sneakers",
      about: "Ready to run with fashion flair? The Devil Wears Sneakers group embraces style and couture in our runs, inspired by Meryl Streep's role as Miranda Priestly in 'The Devil Wears Prada.' Join us for haute couture-themed routes and a chic after-party!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 6,
      name: "Out of Africa Adventurers",
      about: "Embark on a safari-style running adventure with the Out of Africa Adventurers! Our runs are inspired by Meryl Streep's role in 'Out of Africa.' Expect savanna-themed routes, wildlife encounters, and an African-inspired feast at the finish line!",
      type: "In-Person",
      private: false,
      city: "Nairobi",
      state: "Kenya"
    },
    {
      organizerId: 6,
      name: "Florence Foster Jenkins Fun Runners",
      about: "The Florence Foster Jenkins Fun Runners are here to celebrate the love for music and the courage to pursue our passions. Inspired by Meryl Streep's role in 'Florence Foster Jenkins,' our runs embrace the joy of singing and laughter!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 6,
      name: "Kramer vs. Kramer Trotters",
      about: "Join the Kramer vs. Kramer Trotters for family-oriented runs and heartfelt moments, just like Meryl Streep's role in 'Kramer vs. Kramer.' Our routes emphasize the importance of love, support, and compassion in our running community!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 6,
      name: "Into the Woods Wanderers",
      about: "Venture into the enchanted woods with the Into the Woods Wanderers! Our runs are inspired by Meryl Streep's role as the Witch in 'Into the Woods.' Expect fairytale-themed routes, magical surprises, and a whimsical finish line!",
      type: "In-Person",
      private: false,
      city: "Fairyland",
      state: "Enchanted Forest"
    },
    {
      organizerId: 6,
      name: "Sophie's Choice Racers",
      about: "The Sophie's Choice Racers are a group that values making the best of every situation. Inspired by Meryl Streep's role in 'Sophie's Choice,' our runs focus on resilience, empathy, and the power of choices!",
      type: "In-Person",
      private: false,
      city: "Brooklyn",
      state: "New York"
    },
    {
      organizerId: 6,
      name: "Doubt Detectives",
      about: "Enter the world of mystery and doubt with the Doubt Detectives! Our runs are inspired by Meryl Streep's role as Sister Aloysius Beauvier in 'Doubt.' Expect thought-provoking discussions and a challenging running experience!",
      type: "In-Person",
      private: false,
      city: "Bronx",
      state: "New York"
    },
    {
      organizerId: 7,
      name: "Formation Sprinters",
      about: "Ladies and gentlemen, get in formation! Join the Formation Sprinters for empowering runs inspired by Beyoncé's iconic song and performance. Our routes are fierce and celebratory, promoting unity and embracing individuality!",
      type: "In-Person",
      private: false,
      city: "Houston",
      state: "Texas"
    },
    {
      organizerId: 7,
      name: "Destiny's Child Runway",
      about: "Welcome to the Destiny's Child Runway, where we run as a group but shine as individuals! Our runs are inspired by Beyoncé's journey with Destiny's Child and her evolution as an artist. Join us for harmonious routes and inspiring camaraderie!",
      type: "In-Person",
      private: false,
      city: "Atlanta",
      state: "Georgia"
    },
    {
      organizerId: 7,
      name: "Beyhive Buzzers",
      about: "Calling all Beyhive members! The Beyhive Buzzers are here to run the world with Beyoncé's music as our soundtrack. Our runs are high-energy and full of enthusiasm, just like Beyoncé's electrifying performances!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 7,
      name: "Lemonade Stompers",
      about: "When life gives you lemons, run with the Lemonade Stompers! Our runs are inspired by Beyoncé's album 'Lemonade' and focus on resilience, self-discovery, and the power of transformation.",
      type: "In-Person",
      private: false,
      city: "New Orleans",
      state: "Louisiana"
    },
    {
      organizerId: 7,
      name: "Crazy in Love Pacers",
      about: "Get ready to go crazy in love with running! The Crazy in Love Pacers are all about celebrating love, passion, and joy. Our runs are inspired by Beyoncé's iconic song 'Crazy in Love,' and we embrace the rhythm of love on the tracks!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 7,
      name: "Run the World Revolutionaries",
      about: "At Run the World Revolutionaries, we believe in empowering women and promoting social change through running. Our routes are inspired by Beyoncé's commitment to activism and equality. Let's make a positive impact, one run at a time!",
      type: "In-Person",
      private: false,
      city: "Washington, D.C.",
      state: "District of Columbia"
    },
    {
      organizerId: 7,
      name: "Black Is King Trotters",
      about: "Step into the world of African culture and art with the Black Is King Trotters! Our runs are inspired by Beyoncé's visual album 'Black Is King,' and we celebrate the beauty of diversity and the richness of heritage!",
      type: "In-Person",
      private: false,
      city: "Johannesburg",
      state: "South Africa"
    },
    {
      organizerId: 7,
      name: "Halo Halers",
      about: "Let your inner halo shine with the Halo Halers! Our runs are all about spreading positivity, kindness, and love, just like the essence of Beyoncé's song 'Halo.' Join us for uplifting runs and angelic vibes!",
      type: "In-Person",
      private: false,
      city: "Nashville",
      state: "Tennessee"
    },
    {
      organizerId: 7,
      name: "Single Ladies Striders",
      about: "All the single ladies (and gents), put your running shoes up! The Single Ladies Striders are here for empowering runs inspired by Beyoncé's anthem. Our routes celebrate independence, confidence, and embracing the single life!",
      type: "In-Person",
      private: false,
      city: "Chicago",
      state: "Illinois"
    },
    {
      organizerId: 7,
      name: "Beyoncé's Homecoming Crew",
      about: "Hail to the queen! Beyoncé's Homecoming Crew celebrates the spirit of her iconic Coachella performance. Our runs are full of energy, school pride, and a halftime show celebration!",
      type: "In-Person",
      private: false,
      city: "Baton Rouge",
      state: "Louisiana"
    },
    {
      organizerId: 8,
      name: "Fight Club Striders",
      about: "The first rule of Fight Club Striders is: You do not talk about Fight Club Striders. The second rule is: You DO NOT talk about Fight Club Striders. Join us for intense and gritty runs, just like Brad Pitt's role in 'Fight Club.'",
      type: "In-Person",
      private: false,
      city: "Wilmington",
      state: "Delaware"
    },
    {
      organizerId: 8,
      name: "Legends of the Fall Racers",
      about: "Step into the world of epic adventures with the Legends of the Fall Racers! Our runs are inspired by Brad Pitt's role in 'Legends of the Fall.' Expect scenic routes and a celebration of nature's beauty and the bond of brotherhood!",
      type: "In-Person",
      private: false,
      city: "Montana",
      state: "United States"
    },
    {
      organizerId: 8,
      name: "Oceans Eleven Dashers",
      about: "Join the Oceans Eleven Dashers for stylish runs and exhilarating heists! Our runs are inspired by Brad Pitt's role in the 'Ocean's Eleven' franchise. Expect suave routes and a red-carpet finish line celebration!",
      type: "In-Person",
      private: false,
      city: "Las Vegas",
      state: "Nevada"
    },
    {
      organizerId: 8,
      name: "Mr. & Mrs. Smith Speedsters",
      about: "Are you ready to run with a partner in crime? Join the Mr. & Mrs. Smith Speedsters for thrilling runs inspired by Brad Pitt's movie 'Mr. & Mrs. Smith.' Our routes are all about teamwork, espionage, and exciting challenges!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 8,
      name: "Brad's Fury Racers",
      about: "Get ready for intense action with Brad's Fury Racers! Our runs are inspired by Brad Pitt's role in 'Fury.' Expect military-themed routes, tank obstacles, and a camaraderie that will make you feel like family!",
      type: "In-Person",
      private: false,
      city: "Berlin",
      state: "Germany"
    },
    {
      organizerId: 8,
      name: "The Big Short Sprinters",
      about: "Join The Big Short Sprinters for fast-paced runs and financial insights! Our runs are inspired by Brad Pitt's role in 'The Big Short,' and we explore the world of finance while getting our hearts pumping!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 8,
      name: "Troy's Trojan Warriors",
      about: "Prepare for epic battles and heroic runs with Troy's Trojan Warriors! Our runs are inspired by Brad Pitt's role in 'Troy,' and we embrace the spirit of ancient legends and mythical adventures!",
      type: "In-Person",
      private: false,
      city: "Athens",
      state: "Greece"
    },
    {
      organizerId: 8,
      name: "Ad Astra Astronauts",
      about: "Embark on an interstellar running journey with the Ad Astra Astronauts! Our runs are inspired by Brad Pitt's role in 'Ad Astra,' and we explore the cosmos with space-themed routes and cosmic challenges!",
      type: "In-Person",
      private: false,
      city: "Houston",
      state: "Texas"
    },
    {
      organizerId: 8,
      name: "Moneyball Marathoners",
      about: "Join the Moneyball Marathoners for data-driven and strategic runs! Our runs are inspired by Brad Pitt's role in 'Moneyball,' and we celebrate the art of analytics and the power of innovation!",
      type: "In-Person",
      private: false,
      city: "Oakland",
      state: "California"
    },
    {
      organizerId: 8,
      name: "Once Upon a Run in Hollywood",
      about: "Step into the world of Hollywood with Once Upon a Run in Hollywood! Our runs are inspired by Brad Pitt's role in 'Once Upon a Time in Hollywood,' and we run through the golden age of cinema and vintage Hollywood glam!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 9,
      name: "Swift's Shake It Off Squad",
      about: "Join Swift's Shake It Off Squad for fun and uplifting runs! Our runs are inspired by Taylor Swift's hit song 'Shake It Off.' We embrace positivity, dance breaks, and a Taylor Swift-themed karaoke party at the finish line!",
      type: "In-Person",
      private: false,
      city: "Nashville",
      state: "Tennessee"
    },
    {
      organizerId: 9,
      name: "Love Story Runners",
      about: "Welcome to the Love Story Runners, where we celebrate the magic of love and romance! Our runs are inspired by Taylor Swift's iconic songs, and we believe in the power of storytelling and finding our happily ever afters!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 9,
      name: "Fearless Flyers",
      about: "Be fearless in your runs with the Fearless Flyers! Our runs are all about facing challenges head-on, just like Taylor Swift's song 'Fearless.' Join us for adventurous routes and a celebration of courage and strength!",
      type: "In-Person",
      private: false,
      city: "Denver",
      state: "Colorado"
    },
    {
      organizerId: 9,
      name: "1989 Flashback Racers",
      about: "Step back in time with the 1989 Flashback Racers! Our runs are inspired by Taylor Swift's album '1989,' and we embrace the spirit of the '80s with neon-themed routes and a retro dance party at the finish!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 9,
      name: "Red Album Sprinters",
      about: "Welcome to the Red Album Sprinters, where we explore the spectrum of emotions through our runs. Our routes are inspired by Taylor Swift's album 'Red' and its themes of heartbreak, love, and self-discovery.",
      type: "In-Person",
      private: false,
      city: "Nashville",
      state: "Tennessee"
    },
    {
      organizerId: 9,
      name: "Speak Now Soarers",
      about: "At Speak Now Soarers, we believe in the power of our voices and the impact of our actions. Our runs are inspired by Taylor Swift's album 'Speak Now,' and we encourage speaking up for what we believe in!",
      type: "In-Person",
      private: false,
      city: "Washington, D.C.",
      state: "District of Columbia"
    },
    {
      organizerId: 9,
      name: "Folklore Explorers",
      about: "Venture into the enchanting world of Folklore Explorers! Our runs are inspired by Taylor Swift's album 'Folklore,' and we celebrate the art of storytelling and the magic of folklore and fairy tales!",
      type: "In-Person",
      private: false,
      city: "Portland",
      state: "Oregon"
    },
    {
      organizerId: 9,
      name: "Evermore Dreamers",
      about: "Join the Evermore Dreamers for imaginative runs that embrace the beauty of nature and the power of dreams. Our routes are inspired by Taylor Swift's album 'Evermore,' and we celebrate creativity and wonder!",
      type: "In-Person",
      private: false,
      city: "Asheville",
      state: "North Carolina"
    },
    {
      organizerId: 9,
      name: "The Reputation Runway",
      about: "Walk the Reputation Runway with us, where we celebrate self-expression and owning our stories. Our runs are inspired by Taylor Swift's album 'Reputation,' and we embrace boldness and unapologetic confidence!",
      type: "In-Person",
      private: false,
      city: "Chicago",
      state: "Illinois"
    },
    {
      organizerId: 9,
      name: "Lover's Lane Joggers",
      about: "Stroll down Lover's Lane with us, where we celebrate the beauty of love and all its forms. Our runs are inspired by Taylor Swift's album 'Lover,' and we embrace unity, inclusivity, and the magic of love!",
      type: "In-Person",
      private: false,
      city: "San Francisco",
      state: "California"
    },
    {
      organizerId: 10,
      name: "Forrest Gump's Run Across America",
      about: "Join Forrest Gump's Run Across America for an epic journey across the country! Our runs are inspired by Tom Hanks' iconic role in 'Forrest Gump.' Lace up your shoes and experience the spirit of adventure and endless possibilities!",
      type: "In-Person",
      private: false,
      city: "Mobile",
      state: "Alabama"
    },
    {
      organizerId: 10,
      name: "Toy Story Trailblazers",
      about: "To infinity and beyond! The Toy Story Trailblazers invite you to experience the joy of childhood with our runs. Our routes are inspired by Tom Hanks' role as Woody in 'Toy Story,' and we embrace the magic of play and friendship!",
      type: "In-Person",
      private: false,
      city: "Los Angeles",
      state: "California"
    },
    {
      organizerId: 10,
      name: "Cast Away Marathoners",
      about: "Are you ready to be stranded on the running island? Join the Cast Away Marathoners for adventurous runs inspired by Tom Hanks' role in 'Cast Away.' We celebrate survival, resilience, and the beauty of nature!",
      type: "In-Person",
      private: false,
      city: "Fiji",
      state: "Pacific Ocean"
    },
    {
      organizerId: 10,
      name: "Apollo 13 Astrorunners",
      about: "Houston, we have a running group! The Apollo 13 Astrorunners are here for intergalactic adventures. Our runs are inspired by Tom Hanks' role in 'Apollo 13,' and we explore the cosmos with space-themed routes!",
      type: "In-Person",
      private: false,
      city: "Houston",
      state: "Texas"
    },
    {
      organizerId: 10,
      name: "Sleepless in Seattle Speedsters",
      about: "Get ready for a sleepless night of running! The Sleepless in Seattle Speedsters are inspired by Tom Hanks' role in 'Sleepless in Seattle.' Our runs embrace the magic of love and the thrill of serendipitous encounters!",
      type: "In-Person",
      private: false,
      city: "Seattle",
      state: "Washington"
    },
    {
      organizerId: 10,
      name: "The Green Mile Milers",
      about: "Walk the Green Mile with us, where we celebrate the power of compassion and empathy. Our runs are inspired by Tom Hanks' role in 'The Green Mile,' and we promote awareness for social causes and making a difference!",
      type: "In-Person",
      private: false,
      city: "New Orleans",
      state: "Louisiana"
    },
    {
      organizerId: 10,
      name: "Philadelphia Freedom Runners",
      about: "The Philadelphia Freedom Runners are here to raise awareness and support for important causes. Our runs are inspired by Tom Hanks' role in 'Philadelphia,' and we promote inclusivity, diversity, and fighting against discrimination!",
      type: "In-Person",
      private: false,
      city: "Philadelphia",
      state: "Pennsylvania"
    },
    {
      organizerId: 10,
      name: "The Terminal Travelers",
      about: "Join The Terminal Travelers for a running adventure through the airport! Our runs are inspired by Tom Hanks' role in 'The Terminal,' and we embrace the spirit of wanderlust and the excitement of global exploration!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    },
    {
      organizerId: 10,
      name: "Bridge of Spies Racers",
      about: "Cross the Bridge of Spies with us, where we celebrate diplomacy and the power of communication. Our runs are inspired by Tom Hanks' role in 'Bridge of Spies,' and we promote understanding and cooperation!",
      type: "In-Person",
      private: false,
      city: "Berlin",
      state: "Germany"
    },
    {
      organizerId: 10,
      name: "Sully's Hudson Heroes",
      about: "Get ready to land on the Hudson River with Sully's Hudson Heroes! Our runs are inspired by Tom Hanks' role in 'Sully,' and we celebrate heroism, quick thinking, and the power of teamwork!",
      type: "In-Person",
      private: false,
      city: "New York City",
      state: "New York"
    }
   ]

   await queryInterface.bulkInsert(options, validGroup, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */


    await queryInterface.bulkDelete(options, {
      organizerId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    }, {})
  }
};
