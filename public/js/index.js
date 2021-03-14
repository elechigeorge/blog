


async function sendItem(param) {
  try {
    await fetch(`http://localhost:5000/order/${param}`, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json()
    }).then((data) => {
      window.alert('Order Submitted....')
    })


  } catch (error) {
    console.error(error)
  }

}


