const staus="bug"
const labelsWithClass = {

      "bug":"badge-error",
      "help wanted": "badge-warning",
      "enhancement":"badge-success",
      "good first issue" : "badge-info",
      "documentation" : "badge-accent",
  }


for (const key in labelsWithClass) {
    if(staus === key){
        console.log(labelsWithClass[key])
    }
    
    
}