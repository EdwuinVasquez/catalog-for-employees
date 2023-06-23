import bcryptjs from "bcryptjs";
const saltRounds = bcryptjs.genSaltSync(10);

export async function nuevoHash(texto) {
  return await bcryptjs.hashSync(texto, saltRounds);
}

export async function compararHash(texto, hash) {
  return await bcryptjs.compareSync(texto, hash);
}
 