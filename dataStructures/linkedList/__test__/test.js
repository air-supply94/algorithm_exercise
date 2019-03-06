import Index from '../index';
import Comparator from '../../../utils/comparator/index';

describe('Index', () => {
	it('should create empty linked list', () => {
		const linkedList = new Index(new Comparator());
		linkedList.append(1);
		expect(linkedList.size).toBe(1);
		expect(linkedList.has(2)).toBeFalsy();
		expect(linkedList.has(1)).toBeTruthy();
		expect(linkedList.clear()).toEqual(linkedList);
		expect(linkedList.has(1)).toBeFalsy();
	});
	
	it('should create linked eachFromHead', () => {
		const linkedList = new Index();
		linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
		
		const array = [];
		linkedList.eachFromHead((node) => array.push(node.value));
		expect(array.toString()).toBe('1,1,2,3,3,3,4,5');
	});
	
	it('should reverse linked list', () => {
		const linkedList = new Index();
		
		linkedList.append(1);
		linkedList.append(2);
		linkedList.append(3);
		linkedList.append(4);
		expect(linkedList.toString()).toBe('1,2,3,4');
		linkedList.reverse();
		expect(linkedList.toString()).toBe('4,3,2,1');
		expect(linkedList.tail.next).toBeNull();
	});
	
	it('should append node to linked list', () => {
		const linkedList = new Index();
		
		expect(linkedList.head).toBeNull();
		expect(linkedList.tail).toBeNull();
		
		linkedList.append(1);
		linkedList.append(2);
		expect(linkedList.size).toBe(2);
		expect(linkedList.toString()).toBe('1,2');
	});
	
	it('should prepend node to linked list', () => {
		const linkedList = new Index();
		
		linkedList.prepend(2);
		expect(linkedList.head.toString()).toBe('2');
		expect(linkedList.tail.toString()).toBe('2');
		
		linkedList.append(1);
		linkedList.prepend(3);
		expect(linkedList.size).toBe(3);
		
		expect(linkedList.toString()).toBe('3,2,1');
	});
	
	it('should delete node by value from linked list', () => {
		const linkedList = new Index();
		
		expect(linkedList.delete(5)).toBeNull();
		
		linkedList.append(1);
		linkedList.append(1);
		linkedList.append(2);
		linkedList.append(3);
		linkedList.append(3);
		linkedList.append(3);
		linkedList.append(4);
		linkedList.append(5);
		expect(linkedList.size).toBe(8);
		
		expect(linkedList.head.toString()).toBe('1');
		expect(linkedList.tail.toString()).toBe('5');
		
		const deletedNode = linkedList.delete(3);
		expect(deletedNode.value).toBe(3);
		expect(linkedList.toString()).toBe('1,1,2,4,5');
		
		linkedList.delete(3);
		expect(linkedList.size).toBe(5);
		expect(linkedList.toString()).toBe('1,1,2,4,5');
		
		linkedList.delete(1);
		expect(linkedList.size).toBe(3);
		expect(linkedList.toString()).toBe('2,4,5');
		
		expect(linkedList.head.toString()).toBe('2');
		expect(linkedList.tail.toString()).toBe('5');
		
		linkedList.delete(3);
		expect(linkedList.size).toBe(3);
		expect(linkedList.toString()).toBe('2,4,5');
		
		expect(linkedList.head.toString()).toBe('2');
		expect(linkedList.tail.toString()).toBe('5');
		
		linkedList.delete(4);
		expect(linkedList.size).toBe(2);
		expect(linkedList.toString()).toBe('2,5');
		
		expect(linkedList.head.toString()).toBe('2');
		expect(linkedList.tail.toString()).toBe('5');
		
		linkedList.delete(2);
		expect(linkedList.size).toBe(1);
		expect(linkedList.toString()).toBe('5');
		
		linkedList.delete(5);
		expect(linkedList.size).toBe(0);
		expect(linkedList.toString()).toBe('');
	});
	
	it('should delete linked list tail', () => {
		const linkedList = new Index();
		
		linkedList.append(1);
		linkedList.append(2);
		linkedList.append(3);
		
		expect(linkedList.head.toString()).toBe('1');
		expect(linkedList.tail.toString()).toBe('3');
		expect(linkedList.tail.next).toBeNull();
		
		const deletedNode1 = linkedList.deleteTail();
		
		expect(linkedList.size).toBe(2);
		expect(deletedNode1.value).toBe(3);
		expect(linkedList.toString()).toBe('1,2');
		expect(linkedList.head.toString()).toBe('1');
		expect(linkedList.tail.toString()).toBe('2');
		
		const deletedNode2 = linkedList.deleteTail();
		
		expect(linkedList.size).toBe(1);
		expect(deletedNode2.value).toBe(2);
		expect(linkedList.toString()).toBe('1');
		expect(linkedList.head.toString()).toBe('1');
		expect(linkedList.tail.toString()).toBe('1');
		
		const deletedNode3 = linkedList.deleteTail();
		
		expect(linkedList.size).toBe(0);
		expect(deletedNode3.value).toBe(1);
		expect(linkedList.toString()).toBe('');
		expect(linkedList.head).toBeNull();
		expect(linkedList.tail).toBeNull();
	});
	
	it('should delete linked list head', () => {
		const linkedList = new Index();
		
		expect(linkedList.deleteHead()).toBeNull();
		
		linkedList.append(1);
		linkedList.append(2);
		
		expect(linkedList.head.toString()).toBe('1');
		expect(linkedList.tail.toString()).toBe('2');
		
		const deletedNode1 = linkedList.deleteHead();
		
		expect(linkedList.size).toBe(1);
		expect(deletedNode1.value).toBe(1);
		expect(linkedList.toString()).toBe('2');
		expect(linkedList.head.toString()).toBe('2');
		expect(linkedList.tail.toString()).toBe('2');
		
		const deletedNode2 = linkedList.deleteHead();
		
		expect(linkedList.size).toBe(0);
		expect(deletedNode2.value).toBe(2);
		expect(linkedList.toString()).toBe('');
		expect(linkedList.head).toBeNull();
		expect(linkedList.tail).toBeNull();
	});
	
	it('should be possible to store objects in the list and to print them out', () => {
		const linkedList = new Index();
		
		const nodeValue1 = {
			value: 1,
			key: 'key1',
		};
		const nodeValue2 = {
			value: 2,
			key: 'key2',
		};
		
		linkedList.append(nodeValue1).prepend(nodeValue2);
		
		const nodeStringifier = value => `${value.key}:${value.value}`;
		
		expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1');
	});
	
	it('should find node by value', () => {
		const linkedList = new Index();
		
		expect(linkedList.find({value: 5})).toBeNull();
		expect(linkedList.find(111)).toBeNull();
		
		linkedList.append(1);
		expect(linkedList.find({value: 1})).toBeDefined();
		
		linkedList.append(2).append(3);
		
		const node = linkedList.find({value: 2});
		
		expect(node.value).toBe(2);
		expect(linkedList.find({value: 5})).toBeNull();
	});
	
	it('should find node by callback', () => {
		const linkedList = new Index();
		
		linkedList.append({
			value: 1,
			key: 'test1',
		}).
			append({
				value: 2,
				key: 'test2',
			}).
			append({
				value: 3,
				key: 'test3',
			});
		
		const node = linkedList.find({callback: value => value.key === 'test2'});
		
		expect(node).toBeDefined();
		expect(node.value.value).toBe(2);
		expect(node.value.key).toBe('test2');
		expect(linkedList.find({callback: value => value.key === 'test5'})).toBeNull();
	});
	
	it('should create linked list from array', () => {
		let linkedList = new Index();
		linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
		
		expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');
		linkedList = new Index();
		expect(linkedList.toString()).toBe('');
	});
	
	it('should find node by means of custom compare function', () => {
		const comparatorFunction = (a, b) => {
			if (a.customValue === b.customValue) {
				return 0;
			}
			
			return a.customValue < b.customValue ? -1 : 1;
		};
		
		const linkedList = new Index(comparatorFunction);
		
		linkedList.append({
			value: 1,
			customValue: 'test1',
		}).
			append({
				value: 2,
				customValue: 'test2',
			}).
			append({
				value: 3,
				customValue: 'test3',
			});
		
		const node = linkedList.find({
			value: {
				value: 2,
				customValue: 'test2',
			},
		});
		
		expect(node).toBeDefined();
		expect(node.value.value).toBe(2);
		expect(node.value.customValue).toBe('test2');
		expect(linkedList.find({
			value: 2,
			customValue: 'test5',
		})).toBeNull();
	});
	
	it('add undefined', () => {
		const linkedList = new Index();
		
		expect(linkedList.find({value: 5})).toBeNull();
		expect(linkedList.find(111)).toBeNull();
		
		linkedList.append(undefined);
		expect(linkedList.find({value: undefined})).toBeDefined();
		expect(linkedList.size).toBe(1);
		expect(linkedList.has(undefined)).toBe(true);
	});
	
	it('connect', () => {
		const linkedList1 = new Index();
		linkedList1.fromArray([1, 2, 3]);
		
		const linkedList2 = new Index();
		linkedList2.fromArray([4, 5, 6]);
		
		const linkedList3 = new Index();
		linkedList3.fromArray([7, 8, 9]);
		linkedList1.connect(linkedList1);
		
		expect(linkedList1.size).toBe(6);
		linkedList1.clear().fromArray([1, 2, 3]).connect(linkedList2, linkedList3);
		
		expect(linkedList1.size).toBe(9);
		expect(linkedList1.head.value).toBe(1);
		expect(linkedList1.head.next.value).toBe(2);
		
		expect(linkedList1.tail.value).toBe(9);
		expect(linkedList1.tail.next).toBe(null);
		
		expect(linkedList1.toString()).toBe('1,2,3,4,5,6,7,8,9');
	});
});
