const sortPrograms = programs =>
  programs.sort((a, b) => {
    if (a.acf.position > b.acf.position) {
      return 1
    }
    if (a.acf.position < b.acf.position) {
      return -1
    }
    return 0
  })
export default sortPrograms
