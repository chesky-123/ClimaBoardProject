from manage_json import read_json, write_json

data = read_json()
new_data = {"name":"momo","favorites":["TLV"]}
if new_data not in data:
    print(5)
    data.append(new_data)
    write_json(data)
print(read_json())










