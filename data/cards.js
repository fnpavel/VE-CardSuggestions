/* Single source of truth. Content comes from Card_Suggestions_Pavel.pdf.
 * To add a card: append it to CARDS (and its id to its faction's `cards` list to control order).
 * Every page, filter, index and table is generated from this file.
 *
 * Notes on the schema:
 * - type / traits / mechanics are arrays of ids; display labels live in TAXONOMY.
 * - abilities: `trigger` is an id, an array of ids, or null. `label` overrides the displayed
 *   heading when the PDF's exact wording matters. `text` may be empty.
 * - sections: array of paragraphs, or L(...) for a bulleted list. Empty sections are not rendered.
 * - sectionTitles overrides a section's heading where the PDF uses its own title.
 * - Secondary (supporting) units are NOT cards. They belong to their parent card.
 */
const L = (...items) => ({ list: items });

const TAXONOMY = {
  type: { beast: "Beast", building: "Building", mechanical: "Mechanical", horror: "Horror", undead: "Undead", tree: "Tree", elf: "Elf" },
  rarity: { common: "Common", uncommon: "Uncommon" },
  trait: { "first-strike": "First Strike", "last-strike": "Last Strike", immobile: "Immobile", mobile: "Mobile", "cannot-capture": "Cannot Capture" },
  trigger: { "on-capture": "On Capture", "on-death": "On Death", "post-attack": "Post-Attack", skirmish: "Skirmish", "wind-up": "Wind-Up", "when-attacked": "When Attacked" },
  mechanic: { flood: "Flood", poison: "Poison", panic: "Panic", virulent: "Virulent", solitary: "Solitary", ripening: "Ripening", stun: "Stun", piercing: "Piercing", aoe: "AoE", doomsday: "Doomsday", "astral-tap": "Astral Tap" }
};

const FACTIONS = [
  { id: "scintillant-assembly", name: "The Scintillant Assembly", cards: ["border-wolf", "explorers-guild"] },
  { id: "ironhand-dominion", name: "The Ironhand Dominion", cards: ["mechanical-jellyfish", "water-cannon"] },
  { id: "magus", name: "Magus", cards: ["astral-bomber", "wasp-nest"] },
  { id: "order-of-undying", name: "The Order of Undying", cards: ["banshee", "the-hanging-tree"] }
];

const CARDS = [
  {
    id: "border-wolf", name: "Border Wolf", alternateName: "Berserker Wolf",
    faction: "scintillant-assembly", type: ["beast"], cost: 2, rarity: "common",
    stats: { attack: 1, health: 8, armor: null, movement: null, range: null },
    traits: [], mechanics: [],
    abilities: [{ trigger: "on-capture", name: null, text: "gains +1 attack OR +2 health" }],
    secondaryUnits: [],
    sectionTitles: { why: "Why This Card and the Next Card" },
    sections: {
      why: L(
        "Both this card and the other suggestion would give more reasons to buy something like an Eagle Unit, which is currently lackluster. Green is the faction I play the most, and I seldom pick Eagle Unit; when I do, I tend to regret it. There is little reason to go hard on the Annex/On_Capture plan: it is better to use movement from Scouts, and the durdling of a Laceweed — if there is room, and whichever useful units available from the secondary faction, and then crown the end game with Atom Splitter so all the capture-synergies are less about a real gameplan and more about being there at the right time.",
        "Theory Crafter is rare and Grad Elf is uncommon so not that frequent picks, thus those synergies are, in my opinion, underexplored. I understand they may be too good because the game is about capturing zones, but having the Wolf and Guild would help make the whole plan more cohesive."
      ),
      concerns: ["I don’t have the data, but my experience with things like Grad Elf is that the card triggers maybe twice a game on average and I would probably bet below that number. I think the Wolf would end up triggering on average around that time in good situations, which would approach the buff of a Berserker Bear that survives the skirmish as the Wolf is an OR buff."]
    }
  },
  {
    id: "explorers-guild", name: "Explorer's Guild", alternateName: null,
    faction: "scintillant-assembly", type: ["building"], cost: 4, rarity: "uncommon",
    stats: { attack: 0, health: 13, armor: null, movement: null, range: null },
    traits: ["immobile"], mechanics: [],
    abilities: [{ trigger: "on-capture", name: null, text: "generates a number of Explorer Members equal to half the captured zone VP" }],
    secondaryUnits: [{
      id: "explorer-member", name: "Explorer Member", type: ["elf"],
      stats: { attack: 1, health: 9, armor: null, movement: 2, range: null, annex: 30 },
      traits: [], mechanics: [], abilities: []
    }],
    sections: {
      concerns: [
        "This may be too good for the gold cost, but I don’t think that will be the case because it is spawning units On Capture and the Guild is an immobile unit, which already clashes with the Faction theme, so it will most likely spawn once per skirmish bar some strange interaction (like opposing Agent of Siren pulling the card).",
        "Moreover, the Zones with highest VP will spawn the most units and those are the Zones that have the biggest mass of units which means the capture ends up happening in later Beats, when there are less things left for capture."
      ]
    }
  },
  {
    id: "mechanical-jellyfish", name: "Mechanical Jellyfish", alternateName: null,
    faction: "ironhand-dominion", type: ["mechanical"], cost: 2, rarity: "common",
    stats: { attack: 1, health: 10, armor: 1, movement: null, range: null },
    mechanics: ["flood", "aoe"],
    abilities: [
      { trigger: "on-death", name: null, text: "deals 4 non-piercing AoE damage to local units; Floods the zone" },
      { trigger: "post-attack", name: null, text: "40% chance of malfunctioning, cracking the Water Tank (or exploding by itself) and triggering its death effects (AoE + Flood)" }
    ],
    secondaryUnits: [],
    sections: {
      concept: L(
        "The name could be anything that is clearly filled with water: Mechanical Grigg, Tank on Wheels, Hydraulic Shark, etc.",
        "Going with a Grigg makes it so this is the Dwarf (mechanical) answer to the Scintillant Assembly’s sea-creature experiments."
      )
    }
  },
  {
    id: "water-cannon", name: "Water Cannon", alternateName: null,
    faction: "ironhand-dominion", type: ["mechanical"], cost: 4, rarity: "common",
    stats: { attack: 3, health: 6, armor: 1, movement: null, range: 1 },
    statNotes: { range: "(ideally it does not attack its own zone and prioritizes non-flooded zones)" },
    traits: ["immobile"], mechanics: ["flood", "stun"],
    abilities: [
      { trigger: "post-attack", name: null, text: "Floods the zone of the attacked unit" },
      { trigger: ["wind-up", "post-attack"], name: null, label: "Either Wind-Up OR Post-Attack", text: "Stuns itself" }
    ],
    secondaryUnits: [],
    sectionTitles: { balance: "Balance note: Blue" },
    sections: {
      concept: L(
        "Art like a Turret with a Dwarf operating the Water Cannon.",
        "It stuns itself because it overheats and has to wait. If that could be reflected in the art or animation, it would be great. Either that or remove stun and go with Wind-Up. I’d rather the first."
      ),
      balance: [
        "Blue already has too many good durdling units, so this effect is probably not necessary, although it is a very interesting one.",
        "I would rather nothing gets added to Blue because with Axe costing 3 and Champion costing 4, nothing balanced can really compete within that range. Squire costs 5, so anyone who skips the 3~4 buy is likely going to do so for Squire. Even the 2-gold unit I suggested (which leaves exactly 5 gold for Squire at the next barracks) may be too good on the current Blue curve."
      ]
    }
  },
  {
    id: "astral-bomber", name: "Astral Bomber", alternateName: null,
    faction: "magus", type: ["horror"], cost: 2, rarity: "common",
    stats: { attack: 2, health: 8, armor: null, movement: null, range: null },
    traits: ["last-strike"], mechanics: ["astral-tap", "doomsday", "piercing"],
    abilities: [
      { trigger: "skirmish", name: "Astral Tap", label: "Astral Tap (Skirmish)", text: "+1 Doomsday stack" },
      { trigger: "on-death", name: null, text: "deals piercing damage to all local units equal to the number of Doomsday stacks" }
    ],
    secondaryUnits: [],
    sectionTitles: { balance: "Gold Cost and Curve" },
    sections: {
      concept: L("I have no suggestions for the art. I thought about a sphere-type of entity with a lot of tentacles. It can be anything"),
      balance: L("It has to be 2 gold so there is money left to buy actions without making the first two to three barracks awkward. So buy Bomber and you’ll still have 5 gold to buy stuff in the 1st and 2nd barracks. Could go Leyline + Visions of Doom or Eldritch Blood + 4g Unit or Mark of chaos + Cultist, etc.")
    }
  },
  {
    id: "wasp-nest", name: "Wasp Nest", alternateName: null,
    faction: "magus", type: ["horror"], cost: 3, rarity: "common",
    stats: { attack: 0, health: 12, armor: null, movement: null, range: null },
    traits: ["last-strike", "immobile"], mechanics: ["virulent", "panic"],
    abilities: [
      { trigger: null, name: "Virulent", label: "Virulent", text: "" },
      { trigger: "when-attacked", name: "Panic", label: "Panic when attacked (1 charge)", text: "" }
    ],
    secondaryUnits: [],
    sectionTitles: { balance: "Balance Issue" },
    sections: {
      concept: L(
        "The inspiration for this card was Diablo II’s Foul Crow Nest, with the intent to have the card spawning units, but there is Alien Locust and Forbidden Gate as well as Summoner and Stargazer in that space already. Thus I chose Virulent.",
        "There is only Miasmatic Goo with Virulent in the game. And only Mindmelter with Panic. Both of these cards are at the 8 gold threshold and rares, so they aren’t appearing frequently. I think there is room for both Virulent and Panic in a very cheap unit and would like to explore that space."
      ),
      balance: ["I do not consider Virulent and Panic good enough to be present only in high cost units. But even if they were, by making the Nest an Immobile unit it will definitely make these effects considerably weaker. And frankly, Alien Locust is only one more gold and has much much more utility than this card so I actually think the Wasp Nest is going to be good enough."]
    }
  },
  {
    id: "banshee", name: "Banshee", alternateName: null,
    faction: "order-of-undying", type: ["undead"], cost: 2, rarity: "common",
    stats: { attack: 2, health: 11, armor: null, movement: null, range: null },
    traits: ["first-strike"], mechanics: ["stun", "solitary"],
    abilities: [
      { trigger: "post-attack", name: null, text: "40% chance of stunning the attacked unit" },
      { trigger: "on-death", name: null, label: "Solitary and On Death", text: "the Banshee Cries, stunning local non-Undead units" }
    ],
    secondaryUnits: [],
    sections: {
      designNotes: L(
        "Unsure whether Solitary is needed, but without it the unit would be too strong for 2 gold.",
        "I thought about having a Reap: 40% chance of stun to a random unit instead of a Post-Attack. Could go either way.",
        "It has to be 2 gold, see The Hanging Tree last bullet point."
      )
    }
  },
  {
    id: "the-hanging-tree", name: "The Hanging Tree", alternateName: null,
    faction: "order-of-undying", type: ["undead", "tree"], cost: 3, rarity: "common",
    stats: { attack: 0, health: 14, armor: null, movement: null, range: null },
    traits: ["last-strike", "immobile", "cannot-capture"], mechanics: ["solitary", "ripening"],
    abilities: [
      { trigger: null, name: "Solitary", label: "Solitary", text: "attracts all enemy units" },
      { trigger: null, name: "Ripening", label: "Ripening N", text: "when the Undead Tree dies, it spreads N (or N/2) Vengeful Hanged (Ripening stacks with each beat, like Unstable, I’d name Ripening if there were more things in the Tree theme in the game so could just reuse the keyword)" }
    ],
    secondaryUnits: [{
      id: "vengeful-hanged", name: "Vengeful Hanged", type: ["undead"],
      stats: { attack: 2, health: 3, armor: null, movement: null, range: null },
      traits: ["immobile", "last-strike"], mechanics: ["poison"], abilities: []
    }],
    sections: {
      designNotes: L(
        "Basically the Red version of the Agent Siren and of the durdling capabilities of Alien Locust.",
        "The Undead Hanged Man just helps to durdle, it has very low health and it last strikes so it will die pretty often before attacking, the idea is to push the capture at least one extra beat, if something is attacked, it gets poisoned so the units moving in will have an easier time challenging the zone. Also, if you deploy this in a Marshland, then everything has Last Strike and a Hanging Tree in a Marshland is a pretty crazy sighting.",
        "This has to be 3 gold, Red has Ghoul at 2 and Wand of Bones at 3 so the Faction really struggles to get high cost things as there are so many units on the 4~6 range so you end up spending money on them."
      ),
      anotherAngle: ["Make it so that whenever a unit dies (Reap), the unit will be hanged and stack the Ripening counter, so in that case it should lose the Solitary. I’d not want that though because I think Red needs a non-cluster, ergo Solitary, option that is good (The Mindless becoming Rogue is just not great)."]
    }
  }
];
