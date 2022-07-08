<template>
    <div class="container">
        <div class="cont">
            <span>User Registration Form</span>
            <div  class="alert alert-warning alert-dismissible fade show" role="alert">
                Message
                <button type="button"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div>
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input  type="text" >
            </div>
            <div>
                <label for="exampleInputEmail1" class="form-label">Surname</label>
                <input  type="text" >
            </div>
            <div>
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input  type="text" >
            </div>
            <div v-if="role =='admin'">
                <label for="exampleInputPassword1" class="form-label">Facility</label>
                <input  type="password" >
            </div>
            <button type="submit" class="btn btn-primary mt-3"  :disabled="isLoading">
                Register
                <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>
    </div>   
</template>
<script>
export default {
    
}
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: row;     /* make main axis horizontal (default setting) */
    justify-content: center; /* center items horizontally, in this case */
    align-items: center;     /* center items vertically, in this case */
    height: 400px
}
.cont{
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid aqua;
  border-radius: 5px;
  padding: 3px;
  width:250px;
  height: 450px;

}

</style>