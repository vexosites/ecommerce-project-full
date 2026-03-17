<template>
<router-view v-slot="{ Component, route }">
  
  <keep-alive>
    <component
      v-if="route.meta.keepAlive"
      :is="Component"
    />
  </keep-alive>

  <component
    v-if="!route.meta.keepAlive"
    :is="Component"
  />

</router-view>
</template>
