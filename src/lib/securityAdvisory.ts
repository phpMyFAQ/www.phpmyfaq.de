// Parser für Security-Advisory-Markdown in einen HTML-String
// - Gruppiert aufeinanderfolgende Metadaten-Zeilen (**Label:** Wert) in ein gemeinsames <dl class="dl-horizontal">
// - Belässt vorhandenes HTML unverändert
// - Unterstützt Überschriften (##/###/####) und einfache Absätze pro Zeile

export function parseAdvisoryToHTML(content: string): string {
  const lines = content.split('\n')
  const htmlParts: string[] = []
  let inDl = false

  const closeDlIfOpen = () => {
    if (inDl) {
      htmlParts.push('</dl>')
      inDl = false
    }
  }

  for (let rawLine of lines) {
    const l = rawLine.trim()

    if (l.length === 0) {
      closeDlIfOpen()
      continue
    }

    // Bewahre vorhandenes HTML
    if (l.startsWith('<')) {
      closeDlIfOpen()
      htmlParts.push(l)
      continue
    }

    // Überschriften
    if (l.startsWith('#### ')) {
      closeDlIfOpen()
      htmlParts.push(`<h4>${l.substring(5)}</h4>`)
      continue
    }
    if (l.startsWith('### ')) {
      closeDlIfOpen()
      htmlParts.push(`<h3>${l.substring(4)}</h3>`)
      continue
    }
    if (l.startsWith('## ')) {
      closeDlIfOpen()
      htmlParts.push(`<h2>${l.substring(3)}</h2>`)
      continue
    }

    // Metadaten-Zeilen wie **Issued on::** 2004-07-27
    const metaMatch = l.match(/^\*\*(.+?)\*\*\s*(.+)$/)
    if (metaMatch) {
      let labelRaw = metaMatch[1].trim()
      const value = metaMatch[2].trim()

      // Entferne einen oder mehrere abschließende Doppelpunkte innerhalb des Labels
      labelRaw = labelRaw.replace(/:+\s*$/, '').trim()

      if (!inDl) {
        htmlParts.push('<dl class="dl-horizontal">')
        inDl = true
      }

      htmlParts.push(`<dt>${labelRaw}:</dt><dd>${value}</dd>`)
      continue
    }

    // Standard: Absatz
    closeDlIfOpen()
    htmlParts.push(`<p>${l}</p>`)
  }

  // Offenes DL schließen
  closeDlIfOpen()

  return htmlParts.join('\n').replace(/\n+/g, '\n').trim()
}

