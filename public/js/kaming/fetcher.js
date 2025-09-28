fetch("./db/database.json")
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error("Error fetching data:", err));