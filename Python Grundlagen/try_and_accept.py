liste = [1, 2, 3, "Flo", "Junus", "Manu"]


try:
    index = int(input("Bitte gib einen Index ein: "))
    print(liste[index])
except IndexError as ex:
    print(ex)
except ValueError as ex:
    print(f"Bitte gib eine Zahl ein \n {ex}")
finally:
    print(f"Ich bin fertig!")