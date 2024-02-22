# vue3 echart 组件封装

```
<template>
	<div class="draggle-card" v-draggable="300">
		<div ref="chartRef" :style="{ height: currentHeight + 'px' }"></div>
	</div>
</template>
<script setup>
	import { ref, onMounted, onBeforeUnmount, markRaw, watch } from "vue";
	import ResizeObserver from "resize-observer-polyfill";

	import { useDebounceFn } from "@vueuse/core";
	import _ from "lodash";
	import createDefaultOptions from "./defaultOptions";

	import useVisualStore from "@/store/visual.js";
	const visualStore = useVisualStore();

	const vDraggable = {
		mounted(el, binding) {
			let startY;
			let startHeight;

			const handleMouseDown = e => {
				startY = e.clientY;
				startHeight = el.clientHeight;
				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			};

			const handleMouseMove = e => {
				const deltaY = e.clientY - startY;
				const height = startHeight + deltaY;
				el.style.height = `${
					height < binding.value ? binding.value : height
				}px`;

				currentHeight.value = height < binding.value ? binding.value : height;
			};

			const handleMouseUp = () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};

			el.addEventListener("mousedown", handleMouseDown);
			el.style.cursor = "ns-resize";
		}
	};

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
	const currentHeight = ref(props.height);
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
			chartInstance.value.setOption(
				_.merge(
					props.fullOptions,
					createDefaultOptions({
						unit: props.fullOptions.yAxis.name,
						length: props.fullOptions.legend.data.length
					})
				),
				{ notMerge: true }
			);
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


// defaultOption
import { COLOR_LIMIT_20, COLOR_MORE } from "../../../constant";

const valFormatter = val => {
	if (val) return val.toFixed(2);
	return val === 0 ? 0 : "-";
};

const createDefaultOptions = ({ unit, length }) => {
	return {
		color: length <= 20 ? COLOR_LIMIT_20 : COLOR_MORE,
		toolbox: {
			show: false
		},
		legend: {
			icon: "rect",
			itemWidth: 10,
			itemHeight: 2,
			itemGap: 16,
			textStyle: {
				color: "#18253D",
				fontSize: 14
			}
		},
		grid: {
			top: 40 + (length > 6 ? (length - 6) * 5 : 0),
			left: "1%",
			right: 10,
			bottom: 48,
			containLabel: true
		},
		xAxis: {
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: "#C9CDD4"
				}
			},
			axisLabel: {
				color: "#5F687A"
			}
		},
		yAxis: {
			axisLabel: {
				color: "#5F687A",
				fontSize: 14
			},
			nameTextStyle: {
				color: "#5F687A",
				fontSize: 14,
				padding: [0, 0, 8, 0]
			},
			splitLine: {
				lineStyle: {
					type: "dashed",
					color: "#E5E6EB"
				}
			}
		},
		tooltip: {
			trigger: "axis",
			formatter: val => {
				let dataStr = "";
				val.forEach(i => {
					dataStr += `<div style="display: flex; justify-content: space-between; align-items: center;font-size:16px;color:#000;height:30px;overflow-y:auto">
							<div style="display: flex; align-items: center;margin-right:30px;line-height:28px">
									<div style="width:8px;height:8px;border-radius:50%;margin-right:12px;background:${
										i.color
									};"></div>
									<div>${val[0].name}</div>
							</div>
							<div>
									<span style="margin-left: 10px">${i.seriesName}:</span>
									<span>${valFormatter(i.data)}</span>
									<span>${i.data || i.data === 0 ? unit : ""}</span>
							</div>
					</div>`;
				});
				return dataStr;
			}
		},
		dataZoom: [
			{
				type: "slider",
				backgroundColor: "rgba(245, 245, 245, 0.6)",
				borderColor: "rgba(245, 245, 245, 0.6)",
				fillerColor: "rgba(215, 215, 215, 0.6)",
				// 两侧手柄样式
				handleStyle: {
					borderWidth: 1,
					borderColor: "#bfbfbf"
				},
				moveHandleSize: 5,
				moveHandleStyle: {
					// borderColor: "rgba(245, 245, 245, 0.6)",
					// color: "red"
				},
				height: 24,
				start: 0,
				end: 100,
				startValue: 0,
				endValue: 0
			}
		]
	};
};

export default createDefaultOptions;
```
