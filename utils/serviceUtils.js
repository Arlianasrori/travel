
const checkVerify = async (body,alamat,tx) => {
    const userUpdate = await tx.users.update({
        where : {
            email : body.email
        },
        data : body,
        select : {
            email : true,
            name : true,
            no_hp : true,
            verify : true,
            isAdmin : true,
            foto_profile : true,                      
        }
    })
    const alamatUpdate = await tx.alamat.update({
        where : {
            email_user : userUpdate.email
        },
        data : alamat
    })
    return {user : userUpdate,alamat : alamatUpdate}
}

export default {
    checkVerify
}