import requests
from bs4 import BeautifulSoup

urls = ["https://scrabblewordfinder.org/two-letter-scrabble-words", "https://scrabblewordfinder.org/3-letter-words"]
for i in range(97, 123):
    urls.append("https://scrabblewordfinder.org/4-letter-words-starting-with/"+chr(i))
    urls.append("https://scrabblewordfinder.org/5-letter-words-starting-with/"+chr(i))

file = open("Words/words.txt", "w")
file.write("a\ni\n")

for url in urls:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find_all("div", class_="list-wrapper")
    for result in results:
        wordsHeaders = result.find_all("a", class_="wordWrapper")
        for word in wordsHeaders:
            file.write(word.getText().strip()+"\n")
