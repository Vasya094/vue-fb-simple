const cafeList = document.querySelector("#cafe-list")
const cofeForm = document.querySelector("#add-cafe-form")

function createLi(doc) {
  let li = document.createElement("li")
  let name = document.createElement("span")
  let city = document.createElement("span")
  let deleteBtn = document.createElement("div")

  li.setAttribute("data-id", doc.id)
  name.textContent = doc.data().name
  city.textContent = doc.data().city
  deleteBtn.textContent = "x"

  li.appendChild(name)
  li.appendChild(city)
  li.appendChild(deleteBtn)
  cafeList.appendChild(li)

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    db.collection("cafes").doc(doc.id).delete()
  })
}

// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((element) => {
//       createLi(element)
//     })
//   })

cofeForm.addEventListener("submit", (e) => {
  e.preventDefault()
  db.collection("cafes").add({
    name: cofeForm.name.value,
    city: cofeForm.city.value,
  })
  cofeForm.name.value = ""
  cofeForm.city.value = ""
})

db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snap) => {
    let changes = snap.docChanges()
    changes.forEach((ch) => {
      console.log("changes:", ch.doc.data())
      if (ch.type === "added") {
        createLi(ch.doc)
      }
      if (ch.type === "removed") {
        let li = document.querySelector("[data-id=" + ch.doc.id + "]")
        cafeList.removeChild(li)
      }
    })
  })
