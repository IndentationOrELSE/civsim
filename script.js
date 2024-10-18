function log(event, importance = "normal") {
    const para = document.createElement("p");
    const node = document.createTextNode(event);
    switch (importance) {
        case "normal":
            para.style.color = "black";
            break;
        case "medium":
            para.style.color = "black";
            para.style.fontSize = "1.2em";
            break;
        case "high":
            para.style.color = "black";
            para.style.fontSize = "1.5em";
            break;
        case "critical":
            para.style.color = "black";
            para.style.fontWeight = "bold";
            para.style.fontSize = "2em";
            break;
        default:
            para.style.color = "black";
    }
    para.appendChild(node);
    const element = document.getElementById("output");
    element.appendChild(para);
}

class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.infected = false;
        this.cardiovascularDisease = false;
        this.malnutrition = false;
        this.disorder = false;
        this.injured = false;
        this.warCasualty = false;
        this.fertility = Math.random() * 100; // Fertility is a random value between 0 and 100
    }

    infect() {
        this.infected = true;
    }

    developCardiovascularDisease() {
        this.cardiovascularDisease = true;
    }

    developMalnutrition() {
        this.malnutrition = true;
    }

    developDisorder() {
        this.disorder = true;
    }

    getInjured() {
        this.injured = true;
    }

    becomeWarCasualty() {
        this.warCasualty = true;
    }

    toString() {
        return `${this.name}, ${this.age} years old, ${this.gender}`;
    }
}

class Civilization {
    constructor(populationSize) {
        this.population = [];
        this.males = [];
        this.females = [];
        for (let i = 0; i < populationSize; i++) {
            const gender = Math.random() < 0.5 ? "male" : "female"; // Randomly assign gender
            const human = new Human(`Human ${i}`, 30, gender);
            this.population.push(human);
            if (gender === "male") {
                this.males.push(human);
            } else {
                this.females.push(human);
            }
        }
        this.technologicalAdvancement = 0;
    }

    simulateYear() {
        this.technologicalAdvancement += 0.1; // Adjusted for clarity

        // Track counts
        let injuredCount = 0;
        let warCasualtyCount = 0;
        let cardiovascularCount = 0;
        let malnutritionCount = 0;
        let disorderCount = 0;

        for (let human of this.population) {
            // Infection
            if (Math.random() < 0.07) {
                human.infect();
            }

            // Cardiovascular diseases
            if (Math.random() < 0.005) {
                human.developCardiovascularDisease();
                cardiovascularCount++;
            }

            // Malnutrition
            if (Math.random() < 0.04) {
                human.developMalnutrition();
                malnutritionCount++;
            }

            // Disorders
            if (Math.random() < 0.05) {
                human.developDisorder();
                disorderCount++;
            }

            // War
            if (Math.random() < 0.04) {
                human.becomeWarCasualty();
                warCasualtyCount++;
            }

            // Injury
            if (Math.random() < 0.02) {
                human.getInjured();
                injuredCount++;
            }
        }

        // Log the results for the year
        this.logYearResults(
            injuredCount,
            warCasualtyCount,
            cardiovascularCount,
            malnutritionCount,
            disorderCount
        );

        // Apply effects of technological advancements
        this.applyTechnologicalEffects();
        this.reproduce(Math.random()*30);
    }

    getRandomHuman() {
        return this.population[
            Math.floor(Math.random() * this.population.length)
        ];
    }

    applyTechnologicalEffects() {
        if (this.technologicalAdvancement > 15) {
            this.population = this.population.filter(
                (human) => !human.infected
            );
        }
        if (this.technologicalAdvancement > 30) {
            this.population = this.population.filter((human) => !human.injured);
        }
        if (this.technologicalAdvancement > 40) {
            this.population = this.population.filter(
                (human) => !human.disorder
            );
        }
        if (this.technologicalAdvancement > 45) {
            this.population = this.population.filter(
                (human) => !human.warCasualty
            );
        }
        if (this.technologicalAdvancement > 0.48) {
            this.population.forEach((human) => {
                if (Math.random() < 0.3) {
                    human.developCardiovascularDisease();
                }
                if (Math.random() < 0.2) {
                    human.developMalnutrition();
                }
            });
        }
        if (this.technologicalAdvancement > 0.53) {
            this.population = this.population.filter(
                (human) => !human.malnutrition
            );
        }
    }

    reproduce(numberOfTimes) {
        for (let i = 0; i < numberOfTimes; i++) {
            const randomMale = this.males[
                Math.floor(Math.random() * this.males.length)
            ];
            const randomFemale = this.females[
                Math.floor(Math.random() * this.females.length)
            ];
            if (randomMale && randomFemale && randomMale.fertility + randomFemale.fertility > 10) {
                const genders = ["male", "female"];
                const random = Math.floor(Math.random() * genders.length);
                const newHuman = new Human(`Human ${this.population.length}`, 30, random ? "male" : "female");
				const twin = new Human(`Human ${this.population.length}`, 30, random ? "male" : "female")
                this.population.push(newHuman);
				Math.random() < 0.2 ? this.population.push(twin) : null;
                if (newHuman.gender === "male") {
                    this.males.push(newHuman);
                } else {
                    this.females.push(newHuman);
				}
            } 
        }
    }

    logYearResults(
        injuredCount,
        warCasualtyCount,
        cardiovascularCount,
        malnutritionCount,
        disorderCount
    ) {
        log(
            `Year ${Math.floor(this.technologicalAdvancement * 100)}:`,
            "critical"
        );
        log(`Population: ${this.population.length}`, "high");
        log(`Injured: ${injuredCount}`);
        log(`War Casualties: ${warCasualtyCount}`);
        log(`Cardiovascular Diseases: ${cardiovascularCount}`);
        log(`Malnutrition Cases: ${malnutritionCount}`);
        log(`Disorder Cases: ${disorderCount}`);
        // this.logPopulation()
        for (let i = this.population.length - 1; i >= 0; i--) {
            if (this.population[i].warCasualty) {
                this.population.splice(i, 1);
            }
        }
        this.applyTechnologicalEffects();
    }

    logPopulation() {
        log(
            `Population: ${this.population
                .filter((human) => human.warCasualty)
                .map((human) => human.name)
                .join(", ")}`
        );
    }

    toString() {
        return `Humans: ${this.population.length}, Years: ${years}`;
    }
}

const myCivilization = new Civilization(1000); // Initialize with 1000 humans
const years = 10;
for (let year = 0; year < years; year++) {
    if (year < 1) {
        log(myCivilization.toString(), "critical");
    }
    myCivilization.simulateYear();
}

// TODO: combine all into deaths
// TODO: add technology advancement
// TODO: add development of institutions (law, medical, police, government, etc)
// TODO: add other civilizations
