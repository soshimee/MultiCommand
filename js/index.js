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
	let stringNbt = JSON.stringify(nbt);
	stringNbt = stringNbt.insert(83, ".");
	stringNbt = stringNbt.insert(88, ".");
	stringNbt = stringNbt.insert(91, ".");
	stringNbt = stringNbt.insert(222, ".");
	stringNbt = stringNbt.insert(227, ".");
	stringNbt = stringNbt.insert(230, ".");
	return command + stringNbt;
}

String.prototype.insert=function(t,i){return t>0?this.substring(0,t)+i+this.substring(t):i+this};
