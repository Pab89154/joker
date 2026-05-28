export const JOKES = {
  "Dad jokes": [
    "Why don't eggs tell jokes? They'd crack each other up.",
    "I'm afraid for the calendar. Its days are numbered.",
    "What do you call a fake noodle? An impasta!",
    "Why did the scarecrow win an award? He was outstanding in his field.",
    "I used to hate facial hair, but then it grew on me.",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't scientists trust atoms? Because they make up everything.",
    "How does a penguin build its house? Igloos it together!",
  ],
  Puns: [
    "I wondered why the baseball was getting bigger. Then it hit me.",
    "Time flies like an arrow. Fruit flies like a banana.",
    "I used to be a banker, but I lost interest.",
    "The baker quit because he wasn't making enough dough.",
    "I told my suitcase there would be no vacation this year. Now I'm dealing with emotional baggage.",
    "The math book looked sad because it had too many problems.",
    "I got hit in the head with a can of soda. Luckily it was a soft drink.",
  ],
  "One-liners": [
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I'm reading a book about anti-gravity. It's impossible to put down.",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "I haven't slept for ten days, because that would be too long.",
    "I used to think I was indecisive, but now I'm not so sure.",
    "The early bird might get the worm, but the second mouse gets the cheese.",
  ],
  "Knock-knock": [
    "Knock knock. Who's there? Lettuce. Lettuce who? Lettuce in, it's cold out here!",
    "Knock knock. Who's there? Boo. Boo who? Don't cry, it's just a joke!",
    "Knock knock. Who's there? Cow says. Cow says who? No, cow says moo!",
    "Knock knock. Who's there? Tank. Tank who? You're welcome!",
    "Knock knock. Who's there? Atch. Atch who? Bless you!",
    "Knock knock. Who's there? Olive. Olive who? Olive you!",
  ],
  Observational: [
    "Why is it called 'after dark' when it's really after light?",
    "The word 'bed' looks like a bed. The word 'shark' looks nothing like a shark. English is weird.",
    "Adults are just kids who've been alive longer.",
    "If you clean your room, you find stuff you forgot you had. If you don't clean, you can't find anything. There's no winning.",
    "The snooze button is the most optimistic button on your phone.",
    "Nothing makes you feel old like hearing a song you loved in a grocery store.",
  ],
  "Programming / tech": [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "There are only 10 types of people: those who understand binary and those who don't.",
    "A SQL query walks into a bar, walks up to two tables, and asks: 'Can I join you?'",
    "Why did the developer go broke? Because he used up all his cache.",
    "I would tell you a UDP joke, but you might not get it.",
    "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
  ],
  Science: [
    "Never trust an atom. They make up everything.",
    "Why can't you trust an atom? Because they literally make up everything!",
    "What did the biologist wear to impress his date? Designer genes.",
    "Why did the physics teacher break up with the biology teacher? There was no chemistry.",
    "Einstein developed a theory about space. And it was about time too.",
    "What is a computer's favorite snack? Microchips!",
  ],
  "Dark humor": [
    "I have a joke about trick-or-treating, but I'll save it for Halloween.",
    "My calendar is always full. It has a lot of dates.",
    "I told my computer I needed a break. It said: 'No problem, I'll go to sleep mode.'",
    "I asked my dog what's two minus two. He said nothing.",
    "I'm great at multitasking. I can procrastinate and worry at the same time.",
    "My bed and I are perfect for each other, but my alarm clock keeps trying to break us up.",
  ],
};

export function pickJoke(genre, lastJoke = "") {
  const list = JOKES[genre];

  if (!list || list.length === 0) {
    return null;
  }

  if (list.length === 1) {
    return list[0];
  }

  let joke;
  do {
    joke = list[Math.floor(Math.random() * list.length)];
  } while (joke === lastJoke);

  return joke;
}
