<template>
    <div class="wrapper">
        <div v-for="n in 4"  :key="n"    class="user">
            <div class="attrib">
                <div class="heading">
                    Username
                </div>
                Nqaba
            </div>
            <div class="attrib">
                <div class="heading">
                    Name
                  
                </div>
                Nqaba
            </div>
            <div class="attrib">
                <div class="heading">
                    Surname
                  
                </div>
                Ndiweni
            </div>
            <div class="attrib">
                <div class="heading">
                    Role
                  
                </div>
                Admin
            </div>
            <div class="attrib">
                <div class="heading">
                    Action
                </div>
                <div class="actions">
                    <div class="delete">
                        <i class="bi bi-trash-fill text-danger"></i>
                    </div>
                    <div class="edit">
                        <i class="bi bi-pencil-fill text-warning"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-items: space-between;
    border:1px solid black;
    
}
.user{
    display: flex;
    flex-wrap: nowrap;
    margin-top: 3px;
    margin-bottom: 3px;
    
    
}
.attrib{
    display: flex;
    flex-direction: column;
    border: 1px solid paleturquoise;
    border-radius: 5px;
    width: 150px;
    height: 50px; 
    margin-left: 5px;  
}
.heading{
    border:1px solid paleturquoise;
    border-radius: 5px;
    color: whitesmoke;
    background-color: paleturquoise;
}
.actions{
    display: flex;
    justify-content: space-evenly;
}



</style>
