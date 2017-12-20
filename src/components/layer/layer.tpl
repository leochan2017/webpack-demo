<div class="layer">
    <!-- 在模版中引入图片: -->
    <!-- 不能这样 -->
    <!-- <img src="../../assets/bg2.jpg" alt="" width="100"> -->
    <!-- 要这样: -->
    <img src="${ require('../../assets/bg2.jpg') }" alt="" width="100">
    <div>this is a <%= name %></div>
    <% for(var i = 0; i < arr.length; i++) { %>
        <%= arr[i] %>
    <% } %>
</div>