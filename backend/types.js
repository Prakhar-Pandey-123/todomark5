const zod=require("zod");

const todozod=zod.object({
    title:zod.string(),
    description:zod.string()
})

const idzod=zod.object({
    status:zod.boolean(),
    id:zod.string()
})
const delzod=zod.object({
    id:zod.string()
})

module.exports={
    idzod:idzod,
    todozod:todozod,
    delzod:delzod
}