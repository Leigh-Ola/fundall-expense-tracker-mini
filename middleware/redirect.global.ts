export default defineNuxtRouteMiddleware((to, from) => {
    // anywhere but login, signup, profile or home page redirect to home page
    if(!['/login','/signup','/dashboard','/'].includes(String(to.path).trim())){
        // console.log('Heading to', to.path, 'but redirecting to home page')
        return navigateTo('/')
    }else{
        return;
    }
})