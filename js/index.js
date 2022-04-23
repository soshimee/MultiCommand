document.querySelector(".convert").onclick = () => {
	const commands = document.querySelector(".input").value.split("\n");
	const deleteSelf = document.querySelector(".option_delete_self").checked;
	const result = convert(commands, deleteSelf);
	document.querySelector(".output").value = result;
};

function convert(commands, deleteSelf) {
	const command = "summon minecraft:falling_block ~ ~2.5 ~ ";
	const nbt = { BlockState: { Name: "minecraft:redstone_block" }, Time: 1, DropItem: 0, Motion: [0, -10, 0], Passengers: [{ id: "minecraft:falling_block", BlockState: { Name: "minecraft:activator_rail" }, Time: 1, DropItem: 0, Motion: [0, -10, 0] }, { id: "minecraft:command_block_minecart", Command: "execute if block ~ ~-2 ~ minecraft:command_block run setblock ~ ~1 ~ minecraft:command_block{Command:\"fill ~ ~ ~ ~ ~-2 ~ minecraft:air\",auto:1}" }, { id: "minecraft:command_block_minecart", Command: "execute if block ~ ~-2 ~ minecraft:redstone_block run setblock ~ ~1 ~ minecraft:command_block{Command:\"fill ~ ~ ~ ~ ~-3 ~ minecraft:air\",auto:1}" }, { id: "minecraft:command_block_minecart", Command: "kill @e[distance=0]" }] };
	let index = 1;
	for (const command of commands) {
		nbt.Passengers.splice(index++, 0, { id: "minecraft:command_block_minecart", Command: command });
	}
	if (deleteSelf) nbt.Passengers[index++].Command = "execute if block ~ ~-2 ~ minecraft:command_block run setblock ~ ~1 ~ minecraft:command_block{Command:\"fill ~ ~ ~ ~ ~-3 ~ minecraft:air\",auto:1}";
	if (deleteSelf) nbt.Passengers[index++].Command = "execute if block ~ ~-2 ~ minecraft:redstone_block run setblock ~ ~1 ~ minecraft:command_block{Command:\"fill ~ ~ ~ ~ ~-4 ~ minecraft:air\",auto:1}";
	let stringNbt = stringify(nbt);
	stringNbt = stringNbt.insert(73, ".");
	stringNbt = stringNbt.insert(78, ".");
	stringNbt = stringNbt.insert(81, ".");
	stringNbt = stringNbt.insert(210, ".");
	stringNbt = stringNbt.insert(215, ".");
	stringNbt = stringNbt.insert(218, ".");
	return command + stringNbt;
}

function stringify(i){return"object"!=typeof i||Array.isArray(i)?JSON.stringify(i):`{${Object.keys(i).map((r=>`${r}:${stringify(i[r])}`)).join(",")}}`}
String.prototype.insert=function(t,i){return t>0?this.substring(0,t)+i+this.substring(t):i+this};
