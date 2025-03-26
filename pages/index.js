"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import Script from "next/script"
import { useRouter } from "next/router"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [stripe, setStripe] = useState(null)
  const [elements, setElements] = useState(null)
  const [card, setCard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageVisible, setMessageVisible] = useState(false)
  const router = useRouter()

  // Initialize Stripe when component mounts
  useEffect(() => {
    // Load members and handle URL parameters
    const members = [
      "Adam Close",
      "Adam Hisel",
      "Addy Kastli",
      "Addy Wenzl",
      "Aidan Sash",
      "Alejandra Valverde",
      "Alex",
      "Alex johnson",
      "Allison Hubbell",
      "Allison Ricotta",
      "Alma Cosgrove",
      "Andrew Pfeiffer",
      "Andrew Smetana",
      "Andy",
      "Andy Kuster",
      "Anna ten Hoeve",
      "Anthony Haberman",
      "Ari Oistad",
      "Ashley Hummel",
      "Ashlyn Crawford",
      "Aubrey Holst",
      "Aubrie Snyder",
      "Austin Deeb",
      "Autumn Tiedens",
      "Ava Post",
      "Avery Heun",
      "Avery Menke",
      "Avery Petzke",
      "Ben Jackson",
      "Bobby main",
      "Braden Lundgren",
      "Brett Simon",
      "Bridget Sullivan",
      "Brooke Thomas",
      "Cady Betsworth",
      "Cael Siebrecht",
      "Caleb Cargill",
      "Cali Wyrobeck",
      "Carson Green",
      "Catherine Curtiss",
      "Cayden Rowin",
      "Chace Cheripka",
      "Christopher Cottrill",
      "Claire Boswell",
      "Claire Freesmeier",
      "Claire h",
      "Cohen Pye",
      "Cole Doty",
      "Colton Carver",
      "Courtney Hubbell",
      "Courtney Larsen",
      "Dallas Dinkla",
      "David Zdravev",
      "Delaney Connors",
      "Deven Patel",
      "Ella Maier",
      "Ella Meyer",
      "Ellie Shepherd",
      "Ellie Taylor",
      "Emilee Kunde",
      "Emma Fuller",
      "Emma Larmie",
      "Erica Klein",
      "Ethan Czyzewicz",
      "Evan Avitia",
      "Evan Bible",
      "Evan Hubbs",
      "Finn Henderson",
      "Gavin",
      "Gavyn",
      "George",
      "George Wald",
      "Grace Roncke",
      "Grace Ulrick",
      "Grace Wing",
      "Hadley Pearson",
      "Hayden Moore",
      "Hope Uggerud",
      "Isabella DiNovo",
      "Isabella H",
      "Isabella Valverde",
      "J.K. Prentice",
      "Jack Albert",
      "Jacob Noonan",
      "Jacob S. V",
      "Jadyn Schmidt",
      "Jake Gilpin",
      "James Oberg",
      "Jayden Quinn",
      "JD Schaer",
      "Jenna Rogers",
      "Jenna Wieskamp",
      "Jensen Brehm",
      "Joe Stelzig",
      "Joey Kohley",
      "Joseph Weisner",
      "Josh",
      "Justin Brandt",
      "Justin Hingtgen",
      "Justin Senese",
      "Jyotika Sharma",
      "Kaitlyn Morrison",
      "Kallie Mitchell",
      "Kassidy",
      "Katie Murphy",
      "Kendall",
      "Kenny Conlin",
      "Kenny Strezo",
      "Kirsten Moyer",
      "Lauren Dean",
      "lauren lade",
      "Lila Pellatt",
      "Lily",
      "Lily Rettig",
      "Lucy Pfab",
      "Lukas Jacobsen",
      "LUKE LEONE",
      "Maddie Burke",
      "Maddie Marsh",
      "Maddie Morris",
      "Magge Cowen",
      "Maggie Schiltz",
      "Maggie Terlouw",
      "Makenna Hansen",
      "Marcus Barker",
      "Mason Reilly",
      "Matthew Hansen",
      "Michael",
      "Michael A",
      "Michael Flavin",
      "Michal Wojcik",
      "Mikey Cling",
      "Molly Rooney",
      "Morgan Ratliff",
      "Nate Defries",
      "Nicholas Pollock",
      "Noah Kaucher",
      "Nojus",
      "Nolan Klemesrud",
      "Olivia Agalianos",
      "Oscar Andestic",
      "Owen Fast",
      "Padruig Roberts",
      "Peyton Riddle",
      "Phillip Drahos",
      "Quinn Weidenaar",
      "Rachel Frost",
      "Raina Henrichs",
      "Raquel Tenbrink",
      "Reagan Phillips",
      "Reese",
      "Robert Dillon",
      "Robert Johnson",
      "Ronan Pompeo",
      "Ryan Sabol",
      "Ryan Ungs",
      "Sadie Floss",
      "Sam Bredensteiner",
      "Samantha Cranstoun",
      "Samantha Zeeck",
      "Sarah Barklow",
      "Sean Nelsen",
      "Sean Nolting",
      "Seth Noyes",
      "Shae Nickels",
      "Shelby Fraker",
      "Sid P",
      "Sidney Allen",
      "Spencer Clifton",
      "Steven Wolfe",
      "Tiarus Slanger",
      "Tom Nitsch",
      "Tyler",
      "Tyler Hesseling",
      "Viviana",
      "Wyatt Shirley",
      "Zach Post",
      "Zachary Ogorzaly",
      "Zoey Lohse",
    ]

    // Populate the member select dropdown
    const memberSelect = document.getElementById("member-select")
    if (memberSelect) {
      // Add a default option
      const defaultOption = document.createElement("option")
      defaultOption.value = ""
      defaultOption.textContent = "-- Select a Member --"
      memberSelect.appendChild(defaultOption)

      // Add all members
      members.sort().forEach((member) => {
        const option = document.createElement("option")
        option.value = encodeURIComponent(member.toLowerCase().replace(/\s+/g, "-"))
        option.textContent = member
        memberSelect.appendChild(option)
      })
    }

    // Handle URL parameters for member selection
    const memberParam = router.query.member

    if (memberParam && memberSelect) {
      // Try to find the member by the URL parameter
      const matchingOption = Array.from(memberSelect.options).find(
        (option) =>
          option.value === memberParam || decodeURIComponent(option.value) === decodeURIComponent(memberParam),
      )

      if (matchingOption) {
        matchingOption.selected = true

        // Hide the member selection since it's pre-selected from URL
        const formGroup = memberSelect.closest(".member-select-container")
        if (formGroup) {
          formGroup.style.display = "none"
        }

        // Add a hidden input to ensure the member is still submitted with the form
        const hiddenInput = document.createElement("input")
        hiddenInput.type = "hidden"
        hiddenInput.name = "member"
        hiddenInput.value = matchingOption.value
        memberSelect.parentNode.appendChild(hiddenInput)

        // Add a visible message showing who is being credited
        const creditMessage = document.createElement("p")
        creditMessage.className = "credit-message"
        creditMessage.textContent = `Your donation will credit: ${matchingOption.textContent}`
        memberSelect.parentNode.appendChild(creditMessage)
      }
    }

    // Initialize Stripe
    fetch("/api/get-stripe-key")
      .then((response) => response.json())
      .then((data) => {
        const stripePublishableKey = data.publishableKey

        // Initialize Stripe with the publishable key
        const stripeInstance = window.Stripe(stripePublishableKey)
        setStripe(stripeInstance)

        const elementsInstance = stripeInstance.elements()
        setElements(elementsInstance)

        // Create and mount the Card Element
        const cardElement = elementsInstance.create("card", {
          style: {
            base: {
              color: "#32325d",
              fontFamily: '"Alice", serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        })

        setCard(cardElement)
        cardElement.mount("#card-element")

        // Handle real-time validation errors from the card Element
        cardElement.on("change", (event) => {
          const displayError = document.getElementById("card-errors")
          if (event.error) {
            displayError.textContent = event.error.message
          } else {
            displayError.textContent = ""
          }
        })
      })
      .catch((error) => {
        console.error("Error fetching Stripe key:", error)
        showMessage("Could not initialize payment system. Please try again later.")
      })

    // Add wonderland elements
    createWonderlandElements()

    return () => {
      // Cleanup if needed
      if (card) {
        card.unmount()
      }
    }
  }, [router.query.member])

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validate form
    const donorName = document.getElementById("donor-name").value
    const donorEmail = document.getElementById("donor-email").value
    const memberSelect = document.getElementById("member-select")
    const memberSelected = memberSelect.value
    const memberText = memberSelect.options[memberSelect.selectedIndex].text
    const amount = document.getElementById("amount").value

    if (!memberSelected) {
      alert("Please select a member to credit.")
      return
    }

    if (!amount || amount < 1) {
      alert("Please enter a valid donation amount.")
      return
    }

    // Disable the submit button to prevent multiple submissions
    setIsLoading(true)

    try {
      console.log("Creating payment intent...")
      // Create a payment intent on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          donorName: donorName,
          donorEmail: donorEmail,
          memberCredited: memberText,
          memberSlug: memberSelected,
        }),
      })

      const data = await response.json()
      console.log("Payment intent response:", data)

      if (data.error) {
        showMessage(data.error)
        setIsLoading(false)
        return
      }

      console.log("Confirming card payment...")
      // Confirm the card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: donorName,
            email: donorEmail,
          },
        },
      })

      if (result.error) {
        // Show error to your customer
        console.error("Payment error:", result.error)
        showMessage(result.error.message)
      } else {
        // The payment succeeded!
        console.log("Payment succeeded:", result.paymentIntent)
        showMessage("Thank you for your donation! Your payment was successful.")
        document.getElementById("donation-form").reset()
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("An unexpected error occurred. Please try again later.")
    }

    setIsLoading(false)
  }

  // Helper function to show a message
  const showMessage = (messageText) => {
    setMessage(messageText)
    setMessageVisible(true)

    setTimeout(() => {
      setMessageVisible(false)
    }, 10000)
  }

  // Create wonderland elements
  const createWonderlandElements = () => {
    // Create a new element occasionally
    const interval = setInterval(createWonderlandElement, 3000)

    // Create a few elements on load
    for (let i = 0; i < 5; i++) {
      setTimeout(createWonderlandElement, i * 300)
    }

    return () => clearInterval(interval)
  }

  // Create a single wonderland element
  const createWonderlandElement = () => {
    const elements = ["🍄", "🐇", "🎩", "🍵", "🗝️", "♠️", "♥️", "♦️", "♣️"]
    const element = document.createElement("div")
    element.textContent = elements[Math.floor(Math.random() * elements.length)]
    element.className = styles.floatingElement
    element.style.left = Math.random() * 100 + "vw"
    element.style.top = Math.random() * 100 + "vh"
    element.style.animationDuration = 15 + Math.random() * 10 + "s"
    element.style.opacity = 0.1 + Math.random() * 0.4
    element.style.fontSize = 20 + Math.random() * 30 + "px"

    document.body.appendChild(element)

    // Remove after animation completes
    setTimeout(() => {
      element.remove()
    }, 25000)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Alice in Greekland</title>
        <meta name="description" content="Support the Alice in Greekland Community Food Drive" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alice&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />

      <div className={styles.wonderlandElements}>
        <div className={styles.teacup}></div>
        <div className={styles.pocketWatch}></div>
        <div className={styles.mushroom}></div>
        <div className={styles.playingCard}></div>
      </div>

      <header className={styles.header}>
        <h1>Alice in Greekland🫖🕰️🐇</h1>
        <h2>Kappa Delta, Thumpers, Beta Sigma Psi</h2>
      </header>

      <main className={styles.main}>
        <section className={styles.donationSection}>
          <h2>Support Our Community Food Drive</h2>
          <p>Donate now and help us win Greek Week!</p>

          <form id="donation-form" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="donor-name">Your Name:</label>
              <input type="text" id="donor-name" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="donor-email">Your Email:</label>
              <input type="email" id="donor-email" required />
            </div>

            <div className={`${styles.formGroup} member-select-container`}>
              <label htmlFor="member-select">Select a Member to Credit:</label>
              <select id="member-select">{/* Member options will be populated by JavaScript */}</select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="amount">Donation Amount ($):</label>
              <input type="number" id="amount" min="1" required />
            </div>

            <div id="card-element" className={styles.formGroup}>
              {/* Stripe Card Element will be inserted here */}
            </div>
            <div id="card-errors" className={styles.errorMessage} role="alert"></div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                id="submit-button"
                className={`${styles.btn} ${styles.primaryBtn}`}
                disabled={isLoading}
              >
                <span id="button-text">{isLoading ? "Processing..." : "Donate Now"}</span>
                {isLoading && <div className={styles.spinner}></div>}
              </button>
            </div>
          </form>

          <div id="payment-message" className={`${styles.paymentMessage} ${messageVisible ? "" : styles.hidden}`}>
            {message}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Alice in Greekland. All rights reserved.</p>
      </footer>
    </div>
  )
}

