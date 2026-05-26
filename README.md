# Ethical Compass

A lightweight web app for mapping TTRPG character ethics using a multi-axis moral compass.

Instead of a traditional alignment chart, this tool represents a character as a **polygon inside an ethical compass**, allowing for more nuanced moral profiles and internal contradictions.

---

## Live Demo

**Deployment:**  
[Add GitHub Pages URL Here]

Example:

```txt
https://yourusername.github.io/ethical-compass/
```

---

## Overview

This project uses six ethical dimensions:

| Axis | Positive (+10) | Negative (-10) |
|------|----------------|----------------|
| Method vs Outcome | Deontological | Utilitarian |
| Decision Process | Rational | Emotional |
| Self vs Others | Egoistic | Altruistic |
| Time Horizon | Short-term | Long-term |
| Moral Scope | Particularist | Universalist |
| Flexibility | Pragmatic | Idealistic |

Each value ranges from **-10 to +10**:

- **+10** = strongly aligned with the first term
- **0** = neutral / balanced
- **-10** = strongly aligned with the opposing term

The resulting values are visualized as a polygon over the ethical compass.

---

## Ethical Axes Explained

### Deontological ↔ Utilitarian
**Question:** *Is the method more important than the result?*

- **Deontological (+)**  
  Rules, duties, principles, and moral consistency matter most.

- **Utilitarian (-)**  
  Outcomes matter more than strict adherence to rules.

---

### Rational ↔ Emotional
**Question:** *Should important decisions be guided by logic more than feelings?*

- **Rational (+)**  
  Decisions are guided by analysis and logic.

- **Emotional (-)**  
  Decisions are guided more by empathy, instinct, or feeling.

---

### Egoistic ↔ Altruistic
**Question:** *Should your own interests come first?*

- **Egoistic (+)**  
  Self-interest and personal survival are prioritized.

- **Altruistic (-)**  
  Helping others takes precedence.

---

### Short-term ↔ Long-term
**Question:** *Do long-term outcomes matter more than immediate consequences?*

- **Short-term (+)**  
  Immediate concerns are prioritized.

- **Long-term (-)**  
  Future consequences matter more.

---

### Particularist ↔ Universalist
**Question:** *Do duties toward your group matter more than duties toward strangers?*

- **Particularist (+)**  
  Loyalty to family, faction, culture, or in-group is prioritized.

- **Universalist (-)**  
  Moral concern applies broadly to everyone.

---

### Pragmatic ↔ Idealistic
**Question:** *Is compromise necessary to achieve meaningful goals?*

- **Pragmatic (+)**  
  Flexibility and compromise are acceptable.

- **Idealistic (-)**  
  Principles should be maintained even at a cost.

---

## Features

- Manual ethical scoring (`-10` to `+10`)
- Visual polygon generation
- Built-in ethical quiz
- PNG export
- Static deployment via GitHub Pages
- Responsive layout for desktop and mobile

---

## How To Use

### Manual Input

1. Enter a value for each ethical axis.
2. Values range from **-10 to +10**.
3. Click **Draw Polygon**.

The polygon will update automatically.

---

### Quiz Mode

1. Click **Generate from Quiz**
2. Answer the six ethical questions using the sliders.
3. Click **Apply Results**
4. The manual values will be populated automatically.
5. Click **Draw Polygon** if needed.

---

### Download Image

Click **Download PNG** to export the current ethical compass as an image.

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/ethical-compass.git
```

Open:

```txt
index.html
```

No build tools or installation required.

---

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. Open:

```txt
Settings → Pages
```

3. Under **Source**, choose:

```txt
Deploy from a branch
```

4. Select:

```txt
main
/
(root)
```

5. Save.

GitHub will generate a URL similar to:

```txt
https://yourusername.github.io/ethical-compass/
```

Paste that URL in the **Live Demo** section above.

---

## Planned Features

- Multi-question psychometric quiz
- Character save/load
- Overlay multiple character polygons
- Color themes
- Campaign/faction comparison mode
- Statistical profile averaging

---

## Why This Exists

Traditional alignment systems often flatten characters into broad categories.

This project aims to represent characters as **moral profiles** instead:

A lawful knight, pragmatic ruler, tragic revolutionary, or conflicted antihero can share values while still looking radically different on the compass.

The goal is to support **roleplay depth**, not moral judgment.

---

## License

MIT License
