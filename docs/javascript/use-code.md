# 常用代码片段

## JavaScript

- 下载 excel、word、ppt 等浏览器不会默认执行预览的文件

```
function download(link, name) {
    if(!name){
            name=link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
download('http://111.229.14.189/file/1.xlsx')
```

- url 参数解析

```
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
```

## CSS

- 滚动条样式

```
::-webkit-scrollbar {
  width: 7px;
  height: 5px;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-thumb:horizontal {
  width: 7px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius:  15px;
  -webkit-border-radius: 15px;
}
```

- 自定义选中文本颜色

```
::selection {
     background: #00ff00;
}
 ::-moz-selection {
     background: #00ff00;
}
 ::-webkit-selection {
     background: #00ff00;
}
```

- 文本溢出省略号

```
// 单行文本
.ellipsis() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// 多行文本
@mixin multi-ellipsis($line: 1) {
  @if $line <= 0 {
      $line: 1;
  }

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}
```

## Vue

- echart 组件封装

```
<template>
	<div class="chart-card">
		<div ref="chartRef" :style="{ height: currentHeight + 'px' }"></div>
	</div>
</template>
<script setup>
	import {
		ref,
		onMounted,
		onBeforeUnmount,
		markRaw,
		watch,
		computed
	} from "vue";
	import ResizeObserver from "resize-observer-polyfill";

	import { useDebounceFn } from "@vueuse/core";
	import _ from "lodash";
	import createDefaultOptions from "./defaultOptions";

	const props = defineProps({
		fullOptions: {
			type: Object,
			default: () => {},
			required: true
		},
		height: {
			type: String,
			default: () => 500
		}
	});

	const chartRef = ref(null);
	const currentHeight = computed(() => props.height);
	const chartInstance = ref(null); // 当前dom节点挂载的echarts实例

	const robserver = new ResizeObserver(entries => {
		requestAnimationFrame(() => {
			debouncedResize();
		});
	});

	function chartResize() {
		robserver.observe(chartRef.value);
	}

	const draw = () => {
		if (chartInstance.value) {
			const allOptions = _.merge(createDefaultOptions(), props.fullOptions);
			console.log("完整图表配置", allOptions);
			chartInstance.value.setOption(allOptions, { notMerge: true });
		}
	};

	const resize = () => {
		if (chartInstance.value) {
			chartInstance.value.resize({ animation: { duration: 300 } });
		}
	};

	const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 });

	const init = () => {
		if (!chartRef.value) return;

		chartInstance.value = echarts.getInstanceByDom(chartRef.value);
		if (!chartInstance.value) {
			chartInstance.value = markRaw(
				echarts.init(chartRef.value, null, {
					renderer: "svg"
				})
			);

			draw();
		}
	};

	watch(
		() => props.fullOptions,
		newVal => {
			console.log("图表配置变化！！！", newVal);
			draw();
		}
	);

	onMounted(() => {
		init();
		chartResize();
	});

	onBeforeUnmount(() => {
		chartInstance.value?.dispose();
	});

	defineExpose({
		resize
	});
</script>
<style scoped lang="scss">
	.draggle-card {
		padding-bottom: 20px;
	}
</style>

```
