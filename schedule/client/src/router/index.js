import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Schedule from '../views/Schedule'
import Ingredient from '../views/Ingredient'
import Func from '../views/Func'
import Director from '../views/Director'
import Showschedule from '../views/Showschedule'

Vue.use(Router)

var routes = []

routes.push({
    path: '/',
    component: Func,
    children: [{
        path: 'ingredient',
        component: Ingredient
    }, {
        path: 'schedule',
        component: Schedule
    }, {
        path: 'director',
        component: Director
    }, {
        path: 'showschedule',
        component: Showschedule
    }]
})

var router = new Router({
    routes: routes,
    mode: 'history'
})

export default router