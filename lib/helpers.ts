export const handleTuinResponse = (res: any) => {

  const arr = []

  for(let i = 8; i < res.length; i+= 8) {
    arr.push(
      {
        id: res[i],
        name: res[i+1],
        price: "£"+res[i+2],
        roof: res[i+3],
        foundation: res[i+4],
        floor: res[i+5],
        turnaround: res[i+6],
        productUrl: res[i+7],
        date: res[i+8]
      },
    )
  }

  return arr
}