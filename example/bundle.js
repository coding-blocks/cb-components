
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var Cbnavbar = (function () {
    'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value) {
        node.style.setProperty(key, value);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    /* src/cb-navbar/index.svelte generated by Svelte v3.7.1 */

    function create_fragment(ctx) {
    	var div2, t_11, div15;

    	return {
    		c() {
    			div2 = element("div");
    			div2.innerHTML = `<div class="container"><div class="row justify-content-end py-3"><a href="#" class=" mr-5">
			        Courses
			        <i class="ml-1 fas fa-chevron-up"></i></a> <a href="#" class="mr-5">Products</a> <a href="#" class="mr-5">About Us</a> <a href="#" class="mr-5">Resources</a> <a href="#" class="mr-5">Campus Ambassadors</a> <a href="#">Contact Us</a></div></div>`;
    			t_11 = space();
    			div15 = element("div");
    			div15.innerHTML = `<div class="cb-navbar-side col-3"><div class="font-lg offset-3">Our Courses</div> <div class="py-4 font-md bold selected"><div class="offset-3"><div>Classroom Courses</div> <div class="font-mds orange"> 
			          Explore all 
			        </div></div></div> <div class="py-4 font-md bold "><div class="offset-3"><div>Online Courses</div> <div class="font-mds orange"> Explore all </div></div></div></div> <div class="col-9 font-mds"><div class="row justify-content-around m-5"><ul class="col-4"><li class="bold">Beginner Courses</li> <li>C++ For Beginners</li> <li>Java For Beginners</li> <li>Python App Development</li></ul> <ul class="col-4"><li class="bold">Development Courses</li> <li>Android App Dev</li> <li>Full Stack Web Dev</li> <li>Python Django</li> <li>Unity Game Development</li></ul> <ul class="col-4"><li class="bold">Advanced Courses</li> <li>Algo++</li> <li>Algo.Java</li> <li>Competitive Programming</li> <li>Machine Learning</li></ul> <ul class="col-4"><li class="bold">Junior Courses</li> <li>Code 4 Kids</li> <li>Maths Geek</li></ul> <ul class="col-4"><li class="bold">Bootcamps</li> <li>React JS</li> <li>Blockchain</li> <li>Interview Preparation</li> <li>Game Dev</li> <li>Chatbot</li></ul> <ul class="col-4"><li class="bold">Industrial Training</li></ul></div></div>`;
    			attr(div2, "class", "border");
    			attr(div15, "class", "row no-gutters cb-navbar-expanded");
    			set_style(div15, "overflow", "hidden");
    		},

    		m(target, anchor) {
    			insert(target, div2, anchor);
    			insert(target, t_11, anchor);
    			insert(target, div15, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d(detaching) {
    			if (detaching) {
    				detach(div2);
    				detach(t_11);
    				detach(div15);
    			}
    		}
    	};
    }

    class Index extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment, safe_not_equal, []);
    	}
    }

    let elements = document.getElementsByTagName('cb-navbar');

    // render all cb-navbar on page with this
    if (elements.length) {
      elements = [...elements].map(el => new Index({
        target: el
      }));
    }

    var elements$1 = elements;

    return elements$1;

}());
