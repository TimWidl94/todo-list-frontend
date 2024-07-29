class Pokemon:

    def __init__(self, n):
        self.n = n
        self.__level = 1
        self.vorstellen()
        self.__lebenspunkte = 42

    def __str__(self):
        return f"Name: {self.n}\nLebenspunkte: {self.__lebenspunkte}\nLevel: {self.__level}"

    def __gt__(self, other):
        return self.__level > other.__level

    def vorstellen(self):
        print(f"Hallo, ich bin {self.n}.")

    def show_level(self):
        print(f"{self.n} hat eine neue Stufe {self.__level} erreicht!")
        
    
    def show_lebenspunkte(self):
        return self.__lebenspunkte

    def lvlup(self):
        self.__level += 1

    def attack(self, other, damage):
        other.__lebenspunkte -= damage


if __name__ == "__main__":
    p1 = Pokemon("Bisasam")
    p2 = Pokemon("Pikachu")

p1.lvlup()
p2.lvlup()
print(p1 > p2)