# Train Bogie Merger Problem

This project simulates the journey and merging logic of two super-fast trains,
**Train A** and **Train B**, along predefined routes in India.\
The objective is to determine the **order of bogies at Hyderabad** and the
**final bogie order after the trains merge and depart from Hyderabad**.

---

## 🧠 Problem Overview

There are **two trains**:

- **Train A**: Travels from **Chennai (CHN)** to **New Delhi (NDL)**
- **Train B**: Travels from **Trivandrum (TVC)** to **Guwahati (GHY)**

Each train carries multiple **passenger bogies**, where:

- Each bogie has passengers **only for one destination station**
- Passengers can **board only at the source station**
- When a train reaches a station, **the entire bogie for that station is
  detached**

---

## 🛤️ Routes and Distances

Distances are measured from each train’s **origin station**.

### 🚆 Train A Route

| Station   | Code | Distance (km) |
| --------- | ---- | ------------- |
| Chennai   | CHN  | 0             |
| Salem     | SLM  | 350           |
| Bangalore | BLR  | 550           |
| Kurnool   | KRN  | 900           |
| Hyderabad | HYB  | 1200          |
| Nagpur    | NGP  | 1600          |
| Itarsi    | ITJ  | 1900          |
| Bhopal    | BPL  | 2000          |
| Agra      | AGA  | 2500          |
| New Delhi | NDL  | 2700          |

---

### 🚆 Train B Route

| Station        | Code | Distance (km) |
| -------------- | ---- | ------------- |
| Trivandrum     | TVC  | 0             |
| Shoranur       | SRR  | 300           |
| Mangalore      | MAQ  | 600           |
| Madgaon        | MAO  | 1000          |
| Pune           | PNE  | 1400          |
| Hyderabad      | HYB  | 2000          |
| Nagpur         | NGP  | 2400          |
| Itarsi         | ITJ  | 2700          |
| Bhopal         | BPL  | 2800          |
| Patna          | PTA  | 3800          |
| New Jalpaiguri | NJP  | 4200          |
| Guwahati       | GHY  | 4700          |

---

## 🔀 The Merger Logic

During part of their journey, both trains merge and operate as a **single train:
Train AB**.

### 📍 Merge & Split Points

- Trains **start independently**
- They **meet at Hyderabad**
- From **Hyderabad to Bhopal**, they run as **Train AB**
- At **Bhopal**, they split again and continue independently

---

## ⚙️ Merging Rules

1. **Both engines are attached first**
2. Remaining bogies (after Hyderabad) are attached in **descending order of
   remaining distance**
3. Bogies with the **farthest destination from Hyderabad come first**
4. When the merged train reaches a station, the **last bogie (matching the
   station) detaches**
5. If multiple bogies have the same destination, they may be placed adjacent

---

## 🎯 Program Goals

Given the **initial bogie order** of Train A and Train B, the program must
print:

1. **Bogie arrival order of Train A at Hyderabad**
2. **Bogie arrival order of Train B at Hyderabad**
3. **Final bogie order of Train AB when departing Hyderabad**

---

## ⚠️ Assumptions

- All passengers board **only at the source station**
- If **no bogies remain after Hyderabad**, output:

```
## 📥 Input and 📤 Output Specification

This section defines how input is provided to the program and how output is expected to be printed.

---

## 📥 Input Format

The program accepts the **initial order of bogies** for both trains from their respective source stations.

Each train’s input is provided on a separate line.

### General Structure
TRAIN_A ENGINE <BOGIE_1> <BOGIE_2> ... <BOGIE_N>
TRAIN_B ENGINE <BOGIE_1> <BOGIE_2> ... <BOGIE_N>


### Important Rules
- `ENGINE` is always the **first element**
- Each bogie is represented using a **station code**
- Bogies can be in **any order**
- Bogies whose destination lies **before Hyderabad** are detached earlier and **must be ignored**
- Only bogies with destination **Hyderabad or beyond** participate in arrival and merging logic

### Example Input
TRAIN_A ENGINE NDL NDL KRN GHY SLM NJP NGP BLR
TRAIN_B ENGINE NJP GHY AGA PNE MAO BPL PTA


---

## 📤 Output Format

The output consists of **three lines**, printed in the following order:

### 1. Arrival of Train A at Hyderabad
Prints the bogie order of Train A **upon arrival at Hyderabad**.
ARRIVAL TRAIN_A ENGINE <BOGIES>


Only bogies whose destination is **Hyderabad or beyond** are printed, preserving their original order.

---

### 2. Arrival of Train B at Hyderabad
Prints the bogie order of Train B **upon arrival at Hyderabad**.
ARRIVAL TRAIN_B ENGINE <BOGIES>


Filtering and ordering rules are identical to Train A.

---

### 3. Departure of the Merged Train (Train AB)
Prints the bogie order of the merged train **departing from Hyderabad**.
DEPARTURE TRAIN_AB ENGINE ENGINE <BOGIES>


#### Merging Rules Applied
- Both engines appear first
- Remaining bogies are ordered by **descending distance from Hyderabad**
- Bogies with the **farthest destination appear first**
- Bogies with the same destination may appear adjacent

If no bogies remain after Hyderabad, the output must be:
JOURNEY_ENDED


---

## 📊 Sample Input / Output 1

### Input
TRAIN_A ENGINE NDL NDL KRN GHY SLM NJP NGP BLR
TRAIN_B ENGINE NJP GHY AGA PNE MAO BPL PTA


### Output
ARRIVAL TRAIN_A ENGINE NDL NDL GHY NJP NGP
ARRIVAL TRAIN_B ENGINE NJP GHY AGA BPL PTA
DEPARTURE TRAIN_AB ENGINE ENGINE GHY GHY NJP NJP PTA NDL NDL AGA BPL NGP


---

## 📊 Sample Input / Output 2

### Input
TRAIN_A ENGINE SLM BLR KRN HYB SLM NGP ITJ
TRAIN_B ENGINE SRR MAO NJP PNE PTA


### Output
ARRIVAL TRAIN_A ENGINE HYB NGP ITJ
ARRIVAL TRAIN_B ENGINE NJP PTA
DEPARTURE TRAIN_AB ENGINE ENGINE NJP PTA ITJ NGP


---

This specification ensures consistent input handling, deterministic output, and clear validation
```
