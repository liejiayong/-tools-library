msg = 'Hello python'
print(msg)

fruits = ['banana', 'apple',  'mango']
for fruit in fruits: 
  print(fruit)
print(1 in fruits)
print(4 not in fruits)

list = {'name': '灿神', 'age': '18', 'win': '18'}
for key, value in list.items():
    txt = "dict value name: " + str(value) + ' dict key name : ' + str(key)
    print(txt)
for value in list.keys():
    txt = "dict key: " + str(value)
    print(txt)
for value in list.values():
    txt = "dict value: " + str(value)
    print(txt)
for value in set(list.values()):
    txt = "dict value by set(): " + str(value)
    print(txt)


