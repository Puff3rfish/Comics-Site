async function loadChapter() {
  const params = new URLSearchParams(window.location.search);
  const chapterName = params.get("chapter");
  const cbzPath = `Chapters (Positively Yours)/${chapterName}.cbz`;

  const response = await fetch(cbzPath);
  const blob = await response.blob();

  const zip = await JSZip.loadAsync(blob);
  const imageFiles = Object.keys(zip.files).filter(name =>
    name.match(/\.(jpg|jpeg|png|gif)$/i)
  ).sort();

  for (let fileName of imageFiles) {
    const fileData = await zip.files[fileName].async("blob");
    const url = URL.createObjectURL(fileData);

    let img = document.createElement("img");
    img.src = url;
    img.style.width = "100%";
    img.style.display = "block";
    img.style.marginBottom = "10px";
    document.getElementById("reader").appendChild(img);
  }
}

loadChapter();
